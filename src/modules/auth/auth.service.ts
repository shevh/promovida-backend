// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { SessionsService } from '../sessions/sessions.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private usersRepo: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
        private sessionsService: SessionsService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersRepo.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(pass, user.passwordHash);
        if (!isPasswordValid) return null;

        const { passwordHash, ...result } = user;
        return result;
    }

    async login(user: any, ip?: string, userAgent?: string) {
        // Invalida TODAS as sessões ativas anteriores deste usuário
        await this.sessionsService.invalidateUserActiveSessions(user.id);

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            tid: undefined,
            roles: [],
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION') || '15m',
        });

        const refreshToken = crypto.randomBytes(32).toString('hex');

        await this.sessionsService.createSession(user.id, null, refreshToken, ip, userAgent);

        return { accessToken, refreshToken };
    }

    // Futuro: refresh method
    async refresh(refreshToken: string) {
        const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const session = await this.sessionsService.findActiveSessionByRefreshHash(hash);

        if (!session || new Date() > session.refreshTokenExpiresAt!) {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }

        const user = await this.usersRepo.findById(session.userId);
        if (!user) throw new UnauthorizedException('Usuário não encontrado');

        // Gera novo access
        const payload: JwtPayload = { sub: user.id, email: user.email, tid: session.currentTenantId ?? undefined, roles: [] };
        const newAccess = this.jwtService.sign(payload, { expiresIn: '15m' });

        // Opcional: rotate refresh (gera novo refresh e invalida antigo)
        // const newRefresh = crypto.randomBytes(32).toString('hex');
        // await this.sessionsService.createSession(... newRefresh ...);
        // await this.sessionsService.invalidateSession(refreshToken);

        return { accessToken: newAccess }; // ou { accessToken, refreshToken: newRefresh }
    }

    async logout(refreshToken: string): Promise<void> {
        if (!refreshToken) return;

        try {
            const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
            await this.sessionsService.invalidateSession(hash); // invalida a sessão no banco
            console.log('✅ Sessão invalidada com sucesso');
        } catch (error) {
            console.error('Erro ao invalidar sessão no logout:', error);
        }
    }
}

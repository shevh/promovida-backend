// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Res, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'Login com email e senha' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login realizado', type: AuthResponseDto })
    async login(@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
        const user = req.user as any;
        const ip = req.ip;
        const userAgent = req.headers['user-agent'] as string | undefined;

        const { accessToken, refreshToken } = await this.authService.login(user, ip, userAgent);

        const isProd = this.configService.get('NODE_ENV') === 'production';

        // Set cookies (para frontend real)
        res.setCookie('access_token', accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60,
        });

        res.setCookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
        });

        // Retorna no corpo para Swagger e testes manuais
        return {
            message: 'Login realizado com sucesso',
            accessToken, // ← aqui!
            refreshToken, // ← aqui!
            user: {
                id: user.id,
                email: user.email,
                // adicione mais campos se quiser (name, etc.)
            },
        };
    }

    // @Post('refresh')
    // async refresh() { ... }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realizar logout e invalidar sessão' })
    async logout(@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
        const refreshToken = req.cookies.refresh_token;

        // Invalida a sessão no banco
        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }

        // Limpa os cookies (igual ao login)
        const isProd = this.configService.get('NODE_ENV') === 'production';

        res.clearCookie('access_token', {
            path: '/',
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
        });

        res.clearCookie('refresh_token', {
            path: '/',
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
        });

        return { message: 'Logout realizado com sucesso' };
    }
}

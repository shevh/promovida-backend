// src/sessions/sessions.service.ts
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { DrizzleService } from '../../db/drizzle.service'; // ajuste seu import
import { sessions } from '../../db/schema/sessions.schema';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'crypto';

@Injectable()
export class SessionsService {
    constructor(
        private drizzle: DrizzleService,
        // private config: ConfigService,
    ) {}

    async createSession(
        userId: string,
        currentTenantId: string | null,
        refreshToken: string,
        ip: string | undefined,
        userAgent: string | undefined,
    ) {
        const refreshTokenHash = this.hashRefreshToken(refreshToken);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 dias padrão

        await this.drizzle.db.insert(sessions).values({
            userId,
            currentTenantId,
            accessToken: '', // podemos guardar hash do access se quiser, mas opcional
            refreshTokenHash,
            refreshTokenExpiresAt: expiresAt,
            ipAddress: ip,
            userAgent,
            isActive: true,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // access expira em 1h, mas controlamos por JWT
        });
    }

    async invalidateSession(refreshToken: string) {
        const hash = this.hashRefreshToken(refreshToken);
        await this.drizzle.db.update(sessions).set({ isActive: false }).where(eq(sessions.refreshTokenHash, hash));
    }

    async invalidateUserActiveSessions(userId: string): Promise<void> {
        await this.drizzle.db
            .update(sessions)
            .set({
                isActive: false,
                deletedAt: new Date(),
            })
            .where(and(eq(sessions.userId, userId), eq(sessions.isActive, true)));
    }

    async findActiveSessionByRefreshHash(hash: string) {
        return this.drizzle.db.query.sessions.findFirst({
            where: eq(sessions.refreshTokenHash, hash),
        });
    }

    private hashRefreshToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}

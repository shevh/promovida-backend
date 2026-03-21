// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DbModule } from './db/db.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ActionsModule } from './modules/actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 segundos (1 minuto)
        limit: 10, // máximo 10 requests por minuto por IP
        name: 'ai-general', // nome do limiter (pode ter vários)
      },
      {
        ttl: 86400000, // 24 horas
        limit: 500, // máximo 500 requests por dia por IP
        name: 'ai-daily',
      },
    ]),
    DbModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    ActionsModule,
  ],
})
export class AppModule {}

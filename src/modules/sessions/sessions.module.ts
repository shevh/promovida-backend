// src/sessions/sessions.module.ts
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { SessionsService } from './sessions.service';

@Module({
    imports: [DbModule],
    providers: [SessionsService],
    exports: [SessionsService],
})
export class SessionsModule {}

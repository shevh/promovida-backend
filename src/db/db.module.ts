// src/db/db.module.ts
import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';

@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DbModule {}
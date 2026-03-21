import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { ActionsRepository } from './actions.repository';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ActionsController],
  providers: [ActionsService, ActionsRepository],
  exports: [ActionsService],
})
export class ActionsModule {}

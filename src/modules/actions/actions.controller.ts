// src/modules/actions/actions.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ActionsService } from './actions.service';

import type { CreateActionDto } from './dto/create-action.schema';
import { CreateActionSchema } from './dto/create-action.schema';

import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { PaginatedDto } from '../../common/dtos/paginated.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ManagerRoleGuard } from '../auth/guards/manager-role.guard'; // ← novo import

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ManagerRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma nova ação (gestor ou admin)' })
  async create(
    @Body(new ZodValidationPipe(CreateActionSchema)) dto: CreateActionDto,
  ) {
    // tenantId virá do JWT no futuro
    return this.actionsService.create(dto, 'tenant-id-do-jwt');
  }

  @Get()
  @UseGuards(JwtAuthGuard, ManagerRoleGuard)
  @ApiOperation({ summary: 'Lista ações com filtros e paginação' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(20), ParseIntPipe) perPage: number,
  ): Promise<PaginatedDto<any>> {
    return this.actionsService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca ação por ID' })
  async findById(@Param('id') id: string) {
    return this.actionsService.findById(id);
  }
}

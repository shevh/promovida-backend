import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionsRepository } from './actions.repository';
import { CreateActionDto } from './dto/create-action.schema';
import { PaginatedDto } from '../../common/dtos/paginated.dto';

@Injectable()
export class ActionsService {
  constructor(private readonly actionsRepo: ActionsRepository) {}

  async create(dto: CreateActionDto, tenantId: string) {
    return this.actionsRepo.create({ ...dto, tenantId });
  }

  async findAll(
    page = 1,
    perPage = 20,
    filters?: any,
  ): Promise<PaginatedDto<any>> {
    const { data, total } = await this.actionsRepo.findAllPaginated(
      page,
      perPage,
      filters,
    );
    const totalPages = Math.ceil(total / perPage);

    return {
      data,
      meta: { total, page, perPage, totalPages },
      links: {
        self: `/api/actions?page=${page}&perPage=${perPage}`,
        next:
          page < totalPages
            ? `/api/actions?page=${page + 1}&perPage=${perPage}`
            : null,
        prev:
          page > 1 ? `/api/actions?page=${page - 1}&perPage=${perPage}` : null,
        first: `/api/actions?page=1&perPage=${perPage}`,
        last: `/api/actions?page=${totalPages}&perPage=${perPage}`,
      },
    };
  }

  async findById(id: string) {
    const action = await this.actionsRepo.findById(id);
    if (!action) throw new NotFoundException('Ação não encontrada');
    return action;
  }
}

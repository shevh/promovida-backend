import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service';
import * as schema from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { CreateActionDto } from './dto/create-action.schema';

@Injectable()
export class ActionsRepository {
  constructor(private drizzle: DrizzleService) {}

  async create(dto: CreateActionDto & { tenantId: string }) {
    const [action] = await this.drizzle.db
      .insert(schema.actions)
      .values(dto)
      .returning();
    return action;
  }

  async findAllPaginated(
    page = 1,
    perPage = 20,
    filters?: {
      neighborhood?: string;
      frequency?: string;
      targetAudience?: string;
    },
  ) {
    const skip = (page - 1) * perPage;

    let query = this.drizzle.db.query.actions.findMany({
      limit: perPage,
      offset: skip,
      orderBy: [desc(schema.actions.createdAt)],
      with: { locations: true, tenant: true },
    });

    // Filtros simples (expanda depois)
    if (filters?.neighborhood) {
      // join com action_locations + addresses
    }

    const [data, total] = await Promise.all([
      query,
      this.drizzle.db.$count(schema.actions),
    ]);
    return { data, total };
  }

  async findById(id: string) {
    return this.drizzle.db.query.actions.findFirst({
      where: eq(schema.actions.id, id),
      with: { locations: true },
    });
  }
}

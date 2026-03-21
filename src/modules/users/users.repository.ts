// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service';
import { users } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.schema';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(data: CreateUserDto & { passwordHash: string }) {
    const birthDate = data.birthDate
      ? new Date(data.birthDate).toISOString().split('T')[0]
      : null;

    const result = await this.drizzle.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        gender: data.gender,
        avatarUrl: data.avatarUrl,
        birthDate,
        passwordHash: data.passwordHash,
        isActive: true,
      })
      .returning();

    const user = result[0];
    if (!user) throw new Error('Falha ao criar usuário');

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async findAllPaginated(
    skip: number,
    take: number,
  ): Promise<UserResponseDto[]> {
    const results = await this.drizzle.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        cpf: users.cpf,
        birthDate: users.birthDate,
        gender: users.gender,
        avatarUrl: users.avatarUrl,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(users.createdAt)
      .limit(take)
      .offset(skip);

    return results.map((r) => ({
      ...r,
      phone: r.phone ?? undefined,
      cpf: r.cpf ?? undefined,
      gender: r.gender ?? undefined,
      avatarUrl: r.avatarUrl ?? undefined,
      birthDate: r.birthDate ? new Date(r.birthDate) : undefined,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }

  async count(): Promise<number> {
    const [{ count }] = await this.drizzle.db
      .select({ count: sql`count(*)` })
      .from(users);
    return Number(count);
  }

  async findByEmail(email: string) {
    return this.drizzle.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const result = await this.drizzle.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        cpf: users.cpf,
        birthDate: users.birthDate,
        gender: users.gender,
        avatarUrl: users.avatarUrl,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!result[0]) return null;

    return {
      ...result[0],
      phone: result[0].phone ?? undefined,
      cpf: result[0].cpf ?? undefined,
      gender: result[0].gender ?? undefined,
      avatarUrl: result[0].avatarUrl ?? undefined,
      birthDate: result[0].birthDate
        ? new Date(result[0].birthDate)
        : undefined,
      createdAt: new Date(result[0].createdAt),
      updatedAt: new Date(result[0].updatedAt),
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

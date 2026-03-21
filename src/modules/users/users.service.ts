// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.schema';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.usersRepo.findByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException('Email já cadastrado');
    }

    const passwordHash = await this.usersRepo.hashPassword(
      createUserDto.password,
    );

    const user = await this.usersRepo.create({
      ...createUserDto,
      passwordHash,
    });

    return user;
  }

  async findAll(
    page = 1,
    perPage = 20,
  ): Promise<PaginatedUsersDto> {
    const skip = (page - 1) * perPage;

    const [users, total] = await Promise.all([
      this.usersRepo.findAllPaginated(skip, perPage),
      this.usersRepo.count(),
    ]);

    const totalPages = Math.ceil(total / perPage);

    const baseUrl = '/api/users';
    const query = `page=${page}&perPage=${perPage}`;

    return {
      data: users,
      meta: {
        total,
        page,
        perPage,
        totalPages,
      },
      links: {
        self: `${baseUrl}?${query}`,
        next:
          page < totalPages
            ? `${baseUrl}?page=${page + 1}&perPage=${perPage}`
            : null,
        prev:
          page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null,
        first: `${baseUrl}?page=1&perPage=${perPage}`,
        last: `${baseUrl}?page=${totalPages}&perPage=${perPage}`,
      },
    };
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }
}

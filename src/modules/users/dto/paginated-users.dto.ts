// src/users/dto/paginated-users.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class PaginatedUsersDto {
  @ApiProperty({ type: () => UserResponseDto, isArray: true })
  data: UserResponseDto[] = [];

  @ApiProperty({
    type: 'object',
    properties: {
      total: { type: 'number', example: 42 },
      page: { type: 'number', example: 1 },
      perPage: { type: 'number', example: 20 },
      totalPages: { type: 'number', example: 3 },
    },
  })
  meta!: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      self: { type: 'string', example: '/api/users?page=1&perPage=20' },
      next: {
        type: 'string',
        nullable: true,
        example: '/api/users?page=2&perPage=20',
      },
      prev: { type: 'string', nullable: true, example: null },
      first: { type: 'string', example: '/api/users?page=1&perPage=20' },
      last: { type: 'string', example: '/api/users?page=3&perPage=20' },
    },
  })
  links!: {
    self: string;
    next: string | null;
    prev: string | null;
    first: string;
    last: string;
  };
}

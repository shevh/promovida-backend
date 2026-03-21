// src/users/dto/user-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: String, example: 'uuid-string' })
  id!: string;

  @ApiProperty({ type: String, example: 'João Silva' })
  name!: string;

  @ApiProperty({ type: String, example: 'joao@gmail.com' })
  email!: string;

  @ApiPropertyOptional({ type: String, example: '(31) 99999-9999' })
  phone?: string;

  @ApiPropertyOptional({ type: String, example: '123.456.789-00' })
  cpf?: string;

  @ApiPropertyOptional({ type: String, format: 'date', example: '1998-11-10' })
  birthDate?: Date;

  @ApiPropertyOptional({
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'],
  })
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

  @ApiPropertyOptional({ type: String, example: 'https://...' })
  avatarUrl?: string;

  @ApiProperty({ type: Boolean, example: true })
  isActive!: boolean;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

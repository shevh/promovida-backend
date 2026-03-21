// src/users/dto/create-user.schema.ts
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX',
  }),
  // ✅ Simplificado (só string ISO) – evita erro de JSON Schema
  birthDate: z.string().datetime({ offset: true }).optional().or(z.string().optional()),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
  avatarUrl: z.string().url().optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
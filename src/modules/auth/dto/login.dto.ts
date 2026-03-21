import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }).describe('joao@clinica.com'),
    password: z.string().min(6, { message: 'Senha muito curta' }).describe('Teste123!'),
});

export class LoginDto extends createZodDto(LoginSchema) {}

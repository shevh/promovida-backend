// src/types/fastify.d.ts  (ou src/types/express.d.ts, mas como é Fastify, use fastify)
import { UserResponseDto } from '../users/dto/user-response.dto'; // ajuste para seu DTO de user

declare module 'fastify' {
  interface FastifyRequest {
    user?: any; // ou melhor: UserResponseDto | undefined
  }
}
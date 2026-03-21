// src/common/pipes/zod-validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import type { ZodType } from 'zod';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe<T = unknown> implements PipeTransform {
  constructor(private schema: ZodType<T>) {} // ← ZodType<T> aqui

  transform(value: unknown): T {
    try {
      return this.schema.parse(value);
    } catch (err) {
      const error = err as ZodError; // Type assertion para estreitar o tipo
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.issues.map((e) => ({
            // Use .issues (não .errors – isso era Zod 3)
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

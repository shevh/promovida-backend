import { z } from 'zod';

export const CreateActionSchema = z.object({
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(100),
  objective: z.string().min(10),
  targetAudience: z.string().min(3),
  frequency: z.enum([
    'WEEKLY',
    'BIWEEKLY',
    'MONTHLY',
    'EVERY_TWO_MONTHS',
    'EVENTUAL',
    'FIXED',
  ]),
  daysOfWeek: z.array(z.string()).optional().default([]),
  time: z.string().optional(),
  howToAccess: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateActionDto = z.infer<typeof CreateActionSchema>;

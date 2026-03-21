import { z } from 'zod';

export const CreateParticipationSchema = z.object({
  actionId: z.string().uuid(),
  status: z.enum(['INTERESTED', 'ENROLLED']).default('INTERESTED'),
});

export type CreateParticipationDto = z.infer<typeof CreateParticipationSchema>;

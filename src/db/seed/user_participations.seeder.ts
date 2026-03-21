// src/db/seed/user_participations.seeder.ts
import * as schema from '../../db/schema';

export default async function seedUserParticipations(
  tx: any,
  users: { cidadaoId: string; profissionalId: string },
  actions: any[], // array de ações retornado pelo seedActions
) {
  console.log('  🌱 Seeding user participations...');

  const participations = [
    // João (cidadão) interessado em 3 ações
    { userId: users.cidadaoId, actionId: actions[0].id, status: 'INTERESTED' },
    { userId: users.cidadaoId, actionId: actions[2].id, status: 'ENROLLED' },
    {
      userId: users.cidadaoId,
      actionId: actions[5].id,
      status: 'CHECKED_IN',
      checkInAt: new Date(),
    },

    // Dra. Maria (profissional) inscrita em 2 ações
    {
      userId: users.profissionalId,
      actionId: actions[1].id,
      status: 'ENROLLED',
    },
    {
      userId: users.profissionalId,
      actionId: actions[3].id,
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  ];

  await tx.insert(schema.userParticipations).values(participations);
  console.log('  ✅ Participações seedadas!');
}

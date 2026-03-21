// src/db/seed/action_feedbacks.seeder.ts
import * as schema from '../../db/schema';

export default async function seedActionFeedbacks(
  tx: any,
  users: { cidadaoId: string; profissionalId: string },
  actions: any[], // array retornado do seedActions
) {
  console.log('  🌱 Seeding action feedbacks (avaliações)...');

  const feedbacks = [
    {
      userId: users.cidadaoId,
      actionId: actions[0].id,
      participationId: null, // pode ser preenchido depois
      rating: 5,
      comment: 'Ótima atividade! Aprendi muito sobre alimentação saudável.',
      wouldRecommend: true,
      improvementSuggestions: 'Mais horários à noite seria ótimo.',
    },
    {
      userId: users.cidadaoId,
      actionId: actions[2].id,
      rating: 4,
      comment: 'Gostei bastante da caminhada, mas o local estava lotado.',
      wouldRecommend: true,
    },
    {
      userId: users.profissionalId,
      actionId: actions[1].id,
      rating: 5,
      comment: 'Excelente grupo! Os pacientes adoraram.',
      wouldRecommend: true,
    },
  ];

  await tx.insert(schema.actionFeedbacks).values(feedbacks);
  console.log('  ✅ Avaliações seedadas!');
}

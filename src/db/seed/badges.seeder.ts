// src/db/seed/badges.seeder.ts
import * as schema from '../../db/schema';

export default async function seedBadges(tx: any) {
  console.log('  🌱 Seeding badges (gamificação)...');

  const badgesData = [
    {
      name: 'Primeiro Passo',
      description: 'Fez sua primeira inscrição',
      icon: '👣',
      points: 10,
      category: 'BEGINNER',
    },
    {
      name: 'Zero Cigarro',
      description: 'Completou o grupo de tabagismo',
      icon: '🚭',
      points: 50,
      category: 'HEALTH',
    },
    {
      name: 'Guerreiro das DCNT',
      description: 'Check-in em 10 ações diferentes',
      icon: '🛡️',
      points: 100,
      category: 'STREAK',
    },
    {
      name: 'Atleta do Bairro',
      description: 'Participou de 5 atividades físicas',
      icon: '🏃',
      points: 30,
      category: 'HEALTH',
    },
    {
      name: 'Mestre da Memória',
      description: 'Frequentou 8 sessões de Memória Saudável',
      icon: '🧠',
      points: 40,
      category: 'HEALTH',
    },
    {
      name: 'Social Star',
      description: 'Levou 3 amigos para uma ação',
      icon: '🌟',
      points: 25,
      category: 'SOCIAL',
    },
  ];

  const inserted = await tx
    .insert(schema.badges)
    .values(badgesData)
    .returning({ id: schema.badges.id, name: schema.badges.name });

  console.log(`  ✅ ${inserted.length} badges criados!`);
  return inserted;
}

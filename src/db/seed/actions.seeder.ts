// src/db/seed/actions.seeder.ts
import * as schema from '../../db/schema';
import { ActionFrequencyType } from '../../db/schema/actions.schema';

export default async function seedActions(tx: any, prefeituraId: string) {
  console.log('  🌱 Seeding actions (Ações 2024)...');

  const actionsData = [
    {
      name: 'Grupo de Gestante',
      slug: 'grupo-gestante-cruzeiro',
      objective:
        'Orientar alimentação saudável, minimizar sintomas gastrointestinais e orientar direitos e deveres da gestante',
      targetAudience: 'Gestantes',
      frequency: 'MONTHLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Não fixo']),
      time: 'A definir',
      howToAccess: 'Contato com UBS (31) 3180-6059',
      tenantId: prefeituraId,
    },
    {
      name: 'Grupo de Transição Alimentar',
      slug: 'transicao-alimentar-canada',
      objective:
        'Estimular aleitamento materno e orientar introdução alimentar saudável',
      targetAudience: 'Crianças de 3 a 6 meses',
      frequency: 'MONTHLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Não fixo']),
      time: 'A definir',
      howToAccess: 'Contato com UBS (31) 3180-6126',
      tenantId: prefeituraId,
    },
    {
      name: 'Atividade Física - Jardim Canadá',
      slug: 'atividade-fisica-jardim-canada',
      objective:
        'Promover hábitos de atividade física, melhorar consciência corporal e socialização',
      targetAudience: 'População em geral',
      frequency: 'WEEKLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Terça', 'Quinta']),
      time: '15:00 às 16:00',
      howToAccess: 'Contato com UBS (31) 3180-6126',
      tenantId: prefeituraId,
    },
    {
      name: 'Memória Saudável',
      slug: 'memoria-saudavel-vale-do-sol',
      objective: 'Estimular memória e desenvolvimento cognitivo em idosos',
      targetAudience: 'População Idosa 60+',
      frequency: 'MONTHLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Quarta', 'Quinta']),
      time: 'A definir',
      howToAccess: 'Contato com UBS (31) 3180-6127',
      tenantId: prefeituraId,
    },
    // ... (mais 25 ações reais da planilha abaixo)
    {
      name: 'Academia ao Ar Livre - Praça da Bíblia',
      slug: 'academia-ar-livre-matadouro',
      objective: 'Promover qualidade de vida, socialização e atividade física',
      targetAudience: 'Público em geral',
      frequency: 'WEEKLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Terça', 'Quinta']),
      time: '07:00 às 09:00',
      howToAccess: 'Inscrições na SEMEL (31) 3180-5883',
      tenantId: prefeituraId,
    },
    {
      name: 'Aerodance',
      slug: 'aerodance-cruzeiro',
      objective: 'Promover qualidade de vida e socialização através da dança',
      targetAudience: 'Público em geral',
      frequency: 'WEEKLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Terça', 'Quinta']),
      time: '18:30 às 19:15',
      howToAccess: 'Inscrições na SEMEL (31) 3180-5883',
      tenantId: prefeituraId,
    },
    {
      name: 'Oficinas Socioambientais',
      slug: 'oficinas-socioambientais',
      objective: 'Promover consciência ambiental, saúde nutricional e mental',
      targetAudience: 'Público geral',
      frequency: 'MONTHLY' as ActionFrequencyType,
      daysOfWeek: JSON.stringify(['Terça']),
      time: '14:00 às 16:00',
      howToAccess: 'Inscrições pelo e-mail educambiental@pnl.mg.gov.br',
      tenantId: prefeituraId,
    },
    // Adicione aqui o resto das ações da planilha (posso te mandar mais 50 se quiser)
  ];

  const inserted = await tx
    .insert(schema.actions)
    .values(actionsData)
    .returning({ id: schema.actions.id, name: schema.actions.name });

  console.log(`  ✅ ${inserted.length} ações seedadas!`);
  return inserted;
}

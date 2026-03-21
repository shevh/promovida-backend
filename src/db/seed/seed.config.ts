// src/db/seed/seed.config.ts
export const SEED_CONFIG = {
  // ── Prefeitura de Nova Lima (tenant principal) ─────────────────
  defaultTenant: {
    name: 'Prefeitura Municipal de Nova Lima',
    slug: 'nova-lima',
    type: 'PREFEITURA' as const,
    fantasyName: 'Prefeitura de Nova Lima',
    responsibleName: 'Secretaria Municipal de Saúde',
    email: 'saude@pnl.mg.gov.br',
    phone: '(31) 3180-6000',
    isActive: true,
    isVerified: true,
  },

  // ── Super Admin ───────────────────────────────────────────────
  superAdmin: {
    name: 'Super Admin',
    email: 'admin@promovida.novalima.mg.gov.br',
    password: 'Super123!',
  },

  // Senha padrão para usuários de teste
  defaultPassword: 'Teste123!',
} as const;

// Função auxiliar para hash de senha
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(password, 10);
}

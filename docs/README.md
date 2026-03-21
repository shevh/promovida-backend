**✅ Aqui está a lista priorizada e realista** do que ainda precisamos fazer no backend do Promovida, baseada **exatamente** no que você já tem implementado até agora.

### Lista de Tarefas Pendentes (Priorizada para o HackaSaúde)

#### **1. Alta Prioridade (essencial para o MVP funcionar amanhã)**

- [ ] **Completar o módulo de Actions**  
  - Criar `actions.repository.ts` (create, findAllPaginated, findById)  
  - Criar `actions.service.ts` (lógica de tenant do JWT)  
  - Criar `actions.module.ts`

- [ ] **Criar módulo completo de Participations** (check-in + gamificação)  
  - `participations.controller.ts`, `service.ts`, `repository.ts`  
  - DTOs (create + check-in)  
  - Integração com badges (atualizar pontos ao fazer check-in)

- [ ] **JwtStrategy + Payload com roles e tenant**  
  - Criar `jwt.strategy.ts`  
  - Atualizar `JwtPayload` para incluir `roles` e `currentTenantId`  
  - Fazer o `ManagerRoleGuard` funcionar corretamente

- [ ] **Atualizar AppModule**  
  - Importar `ActionsModule` e `ParticipationsModule`

#### **2. Média Prioridade (melhora muito a demo)**

- [ ] **Integração Action Locations** (mapa georreferenciado)  
  - Seed de endereços + action_locations  
  - Filtro por bairro no GET /actions

- [ ] **IA Coach básico**  
  - Endpoint `/coach/recommend` (usando Gemini)

- [ ] **Badges automáticos**  
  - Service que dá badges quando o usuário completa ações

- [ ] **Endpoint de feedback** (avaliações das ações)

#### **3. Baixa Prioridade (pós-hackathon)**

- Refresh token completo + logout
- Filtros avançados no GET /actions
- Proteção mais granular de rotas
- Testes unitários
- Deploy + CI

---

### Ordem Recomendada para Hoje (para ter um MVP apresentável)

1. Completar Actions (repository + service + module)
2. Criar Participations completo
3. Configurar JwtStrategy + roles no token
4. Atualizar AppModule
5. Testar fluxo: login → criar ação → inscrever → check-in

---

**Quer que eu comece enviando agora?**

Diga qual item quer primeiro:

- **A)** Módulo completo de **Participations** (controller + service + repository + DTOs)
- **B)** `ActionsService` + `ActionsRepository` (para completar o ActionsModule)
- **C)** `JwtStrategy` completo + atualização do `JwtPayload`

É só falar **A**, **B** ou **C** que eu te entrego tudo pronto para copiar e colar na hora.  

Estamos muito perto de ter tudo funcionando! 🚀
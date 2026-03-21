<div align="center">

# Promovida Backend

**Plataforma oficial de promoção da saúde e qualidade de vida de Nova Lima (MG)**

API que centraliza todas as ações da Prefeitura (grupos, atividade física, NASFIT, Aerodance, oficinas, etc.), inscrições, check-in, gamificação e recomendações via IA Coach.

</div>

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-000000?logo=drizzle&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3C8F5C?logo=zod&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

---

## Sobre o Projeto

API backend construída para resolver o desafio **"Promovida"** do HackaSaúde 2026.

**Principais funcionalidades:**

- Centralização de todas as ações de promoção à saúde da Prefeitura
- Mapa georreferenciado + filtros inteligentes
- Inscrições, check-in e gamificação
- IA Coach de hábitos e recomendações personalizadas
- Dashboard para gestores (adesão por bairro e ação)
- Preparado para multi-tenant (futuras empresas e ONGs)

---

## Tecnologias

- **Framework**: NestJS 11 + Fastify
- **Banco**: PostgreSQL + Drizzle ORM
- **Validação**: Zod + nestjs-zod
- **Autenticação**: JWT + Refresh Token + Role Guards
- **IA**: Google Gemini
- **Gamificação**: Badges, pontos e streaks
- **Documentação**: Swagger/OpenAPI

---

## Estrutura de Pastas

```
promovida-backend/
├── src/
│   ├── common/           # dtos, pipes, guards
│   ├── db/               # schema + drizzle
│   ├── modules/
│   │   ├── actions/
│   │   ├── participations/
│   │   ├── users/
│   │   ├── auth/
│   │   └── badges/
│   ├── app.module.ts
│   └── main.ts
├── drizzle/              # migrations
├── src/db/seed/          # seeders completos
├── docker-compose.yml
└── README.md
```

---

## Instalação Rápida

```bash
git clone <seu-repo>
cd promovida-backend

npm install
cp .env.example .env
```

### Comandos Essenciais

```bash
npm run db:up              # Sobe o Postgres
npm run db:generate        # Gera migration
npm run db:migrate         # Aplica migrations
npm run seed:reset         # Popula banco com dados reais da Prefeitura
npm run dev                # Inicia com hot-reload + type-check
```

**Acesso**:

- API → `http://localhost:3443/api`
- Swagger → `http://localhost:3443/swagger`

---

## Próximas Features

- [x] Módulo de Ações + Locations
- [x] Gamificação completa
- [x] Participations + Check-in
- [ ] IA Coach (Gemini)
- [ ] Integração com Nova Lima App
- [ ] Dashboard do Gestor

---

**Feito com ❤️ para salvar vidas em Nova Lima – HackaSaúde 2026**

---

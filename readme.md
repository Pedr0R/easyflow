# EasyFlow - Ambiente de Desenvolvimento

Setup inicial de infraestrutura para iniciar o desenvolvimento do EasyFlow com base nos requisitos em `requisitos/`:

- Arquitetura-alvo: `Angular` (web) + `NestJS` (API) + `PostgreSQL`.
- Modelo SaaS multi-tenant com dados flexiveis em `JSONB` para workflows.

## O que foi criado

- `docker-compose.yml` com:
  - `postgres` (banco principal)
  - `pgadmin` (administracao de banco)
  - `api` e `web` como servicos opcionais (profile `app`)
- `.env.example` com variaveis iniciais.
- `apps/api/Dockerfile` e `apps/web/Dockerfile` base para desenvolvimento.

## Como iniciar

1. Copie o arquivo de ambiente:
   - PowerShell: `Copy-Item .env.example .env`
2. Suba somente infra de dados:
   - `docker compose up -d postgres pgadmin`
3. Acesse:
   - PostgreSQL: `localhost:5432`
   - pgAdmin: [http://localhost:5050](http://localhost:5050)

## Subir aplicacao junto (quando os apps existirem)

- `docker compose --profile app up -d`

## Proximo passo recomendado

1. Criar monorepo com:
   - `apps/api` (NestJS)
   - `apps/web` (Angular)
2. Configurar migracoes iniciais do PostgreSQL para:
   - tenants/organizacoes
   - usuarios/roles (RBAC)
   - workflows/steps/fields/conditionals
3. Implementar autenticacao JWT e isolamento por `tenant_id` em todas as queries.

## API multi-tenant (primeira base criada)

Em `apps/api` foi criada uma API NestJS com isolamento inicial por tenant usando o header `x-tenant-id`.

- `GET /health`: endpoint publico de saude.
- `GET /tenant/context`: retorna o tenant atual vindo do header.
- `GET /workflows`: lista workflows do tenant atual (isolado em memoria).
- `POST /workflows`: cria workflow no tenant atual.

Exemplo rapido:

- `curl http://localhost:3000/health`
- `curl -H "x-tenant-id: org-a" http://localhost:3000/tenant/context`
- `curl -H "x-tenant-id: org-a" http://localhost:3000/workflows`

## Time Tracking (pontos)

Para as rotas de pontos, use `Authorization: Bearer <token>`.

- `POST /pontos`: cria um ponto (ENTRADA/SAIDA) com `latitude` e `longitude`.
- `GET /pontos/today`: lista pontos do dia para o tenant/usuario atual.
- `GET /pontos?mes=YYYY-MM`: lista pontos do mes para o tenant/usuario atual.
- `POST /pontos/:punchId/ajustes`: solicita um ajuste de ponto (status inicial: `PENDENTE`).

Exemplo:
- `curl -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d "{\"tipo\":\"ENTRADA\",\"latitude\":-23.55,\"longitude\":-46.63}" http://localhost:3000/pontos`

## Autenticacao JWT

Rotas de autenticacao:
- `POST /auth/register` (requer `x-tenant-id`)
- `POST /auth/login` (requer `x-tenant-id`)
- `GET /auth/me` (requer `Authorization: Bearer <token>`)

Rotas de negocio (`/workflows` e `/pontos`) agora exigem token JWT no header `Authorization`.

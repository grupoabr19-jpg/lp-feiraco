# 3º FeirAÇO Grupo ABR

Monorepo da landing page de captação de leads para o evento presencial de 12 de setembro de 2026, das 8h às 12h.

## Stack

- Front-end: Next.js, React e TypeScript
- Back-end: Fastify e TypeScript
- Banco: PostgreSQL no Render
- Hospedagem: Render Web Services

## Estrutura

```text
apps/web   Landing page e experiência de inscrição
apps/api   API de leads e qualificação
database   SQL idempotente para preparar as tabelas
render.yaml  configura dois serviços no Render
```

## Rodar localmente

1. Ative o Corepack e instale as dependências:

```bash
corepack enable
pnpm install
```

2. Copie `.env.example` para os serviços:

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
```

3. Inicie um PostgreSQL e execute `database/schema.sql`.

4. Rode os dois serviços:

```bash
pnpm dev
```

- Site: http://localhost:3000
- API: http://localhost:3333

## Produção

- Frontend: `https://evento.grupoabr.com.br`
- API: `https://api-lp.grupoabr.com.br`
- Servidor: Oracle VM `163.176.229.197`

Os arquivos em `deploy/` preparam PostgreSQL local, Nginx e inicialização do PM2. Nunca envie `.env`, a chave SSH ou `deploy/.env.database` ao GitHub.

## Mídias

Substitua os arquivos indicados em `apps/web/public/images/README.md` por fotografias e vídeos reais do Grupo ABR. O layout mantém fundos de segurança caso os arquivos ainda não tenham sido adicionados.

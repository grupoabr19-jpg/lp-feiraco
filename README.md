# 3º FeirAÇO Grupo ABR

Monorepo da landing page de captação de leads para o evento presencial de 12 de setembro de 2026, das 8h às 12h.

## Stack

- Front-end: Next.js, React e TypeScript
- Back-end: Fastify e TypeScript
- Banco: PostgreSQL no Neon
- Hospedagem: Render

## Estrutura

```text
apps/web   Landing page e experiência de inscrição
apps/api   API de leads e qualificação
database   SQL idempotente para preparar as tabelas
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

3. Execute `database/schema.sql` no SQL Editor do Neon.

4. Rode os dois serviços:

```bash
pnpm dev
```

- Site: http://localhost:3000
- API: http://localhost:3333

## Deploy no Render

O arquivo `render.yaml` cria dois Web Services. Cadastre as variáveis sensíveis diretamente no painel do Render. Nunca envie `DATABASE_URL` ao GitHub.

## Mídias

Substitua os arquivos indicados em `apps/web/public/images/README.md` por fotografias e vídeos reais do Grupo ABR. O layout mantém fundos de segurança caso os arquivos ainda não tenham sido adicionados.

import 'dotenv/config';
import crypto from 'node:crypto';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { z } from 'zod';
import { db } from './db.js';

const app = Fastify({ logger: true, trustProxy: true });

await app.register(helmet);
await app.register(cors, {
  origin: process.env.FRONTEND_URL?.split(',').map((item) => item.trim()) ?? true,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
});
await app.register(rateLimit, { max: 80, timeWindow: '1 minute' });

const optionalText = z.string().trim().max(500).optional().nullable();
const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(30),
  city: z.string().trim().min(2).max(100),
  profile: z.string().trim().min(2).max(120),
  consent: z.literal(true),
  turnstileToken: z.string().optional(),
  honeypot: z.string().max(0).optional().default(''),
  source: z.string().trim().max(80).optional().default('landing-page'),
  utmSource: optionalText,
  utmMedium: optionalText,
  utmCampaign: optionalText,
  utmContent: optionalText,
  utmTerm: optionalText,
  referrer: optionalText,
  landingPageUrl: optionalText,
});

const qualificationSchema = z.object({
  profile: z.string().trim().min(2).max(120).optional(),
  interests: z.array(z.string().trim().min(2).max(120)).max(12).optional().default([]),
});

function normalizeBrazilianPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  const nationalNumber = digits.length >= 12 && digits.startsWith('55')
    ? digits.slice(2)
    : digits;
  if (nationalNumber.length < 10 || nationalNumber.length > 11) {
    throw new Error('WhatsApp inválido.');
  }
  return `+55${nationalNumber}`;
}

function hashIp(ip: string): string {
  return crypto
    .createHash('sha256')
    .update(`${process.env.IP_HASH_SALT ?? 'feiraco'}:${ip}`)
    .digest('hex');
}

async function validateTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

app.get('/api/v1/health', async () => ({ status: 'ok' }));

app.get('/api/v1/db-health', async (_request, reply) => {
  try {
    const result = await db.query<{ table_ready: boolean }>(
      `SELECT to_regclass('public.feiraco_leads') IS NOT NULL AS table_ready`,
    );
    const tableReady = result.rows[0]?.table_ready === true;
    return reply.status(tableReady ? 200 : 503).send({
      status: tableReady ? 'ok' : 'error',
      database: 'connected',
      table: tableReady ? 'ready' : 'missing',
    });
  } catch {
    return reply.status(503).send({
      status: 'error',
      database: 'unavailable',
      table: 'unknown',
    });
  }
});

app.post('/api/v1/leads', { config: { rateLimit: { max: 8, timeWindow: '10 minutes' } } }, async (request, reply) => {
  const parsed = leadSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ success: false, message: 'Confira os campos e tente novamente.' });
  }

  const payload = parsed.data;
  if (payload.honeypot) {
    return reply.status(400).send({ success: false, message: 'Não foi possível concluir o cadastro.' });
  }

  const turnstileValid = await validateTurnstile(payload.turnstileToken, request.ip);
  if (!turnstileValid) {
    return reply.status(400).send({ success: false, message: 'Validação de segurança não concluída.' });
  }

  let phoneE164: string;
  try {
    phoneE164 = normalizeBrazilianPhone(payload.phone);
  } catch {
    return reply.status(400).send({ success: false, message: 'Informe um WhatsApp válido com DDD.' });
  }

  const query = `
    INSERT INTO feiraco_leads (
      name, phone, phone_e164, city, profile, consent, consent_at, status, source,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      referrer, landing_page_url, user_agent, ip_hash
    ) VALUES (
      $1, $2, $3, $4, $5, TRUE, NOW(), 'registered', $6,
      $7, $8, $9, $10, $11, $12, $13, $14, $15
    )
    ON CONFLICT (phone_e164) DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      city = EXCLUDED.city,
      profile = EXCLUDED.profile,
      consent = TRUE,
      consent_at = NOW(),
      source = EXCLUDED.source,
      utm_source = COALESCE(EXCLUDED.utm_source, feiraco_leads.utm_source),
      utm_medium = COALESCE(EXCLUDED.utm_medium, feiraco_leads.utm_medium),
      utm_campaign = COALESCE(EXCLUDED.utm_campaign, feiraco_leads.utm_campaign),
      utm_content = COALESCE(EXCLUDED.utm_content, feiraco_leads.utm_content),
      utm_term = COALESCE(EXCLUDED.utm_term, feiraco_leads.utm_term),
      referrer = EXCLUDED.referrer,
      landing_page_url = EXCLUDED.landing_page_url,
      user_agent = EXCLUDED.user_agent,
      ip_hash = EXCLUDED.ip_hash,
      updated_at = NOW()
    RETURNING public_id, status;
  `;

  const values = [
    payload.name,
    payload.phone,
    phoneE164,
    payload.city,
    payload.profile,
    payload.source,
    payload.utmSource ?? null,
    payload.utmMedium ?? null,
    payload.utmCampaign ?? null,
    payload.utmContent ?? null,
    payload.utmTerm ?? null,
    payload.referrer ?? null,
    payload.landingPageUrl ?? null,
    request.headers['user-agent'] ?? null,
    hashIp(request.ip),
  ];

  const result = await db.query<{ public_id: string; status: string }>(query, values);
  return reply.status(201).send({
    success: true,
    leadId: result.rows[0].public_id,
    status: result.rows[0].status,
  });
});

app.patch('/api/v1/leads/:publicId/qualification', async (request, reply) => {
  const params = z.object({ publicId: z.string().uuid() }).safeParse(request.params);
  const body = qualificationSchema.safeParse(request.body);

  if (!params.success || !body.success) {
    return reply.status(400).send({ success: false, message: 'Dados de qualificação inválidos.' });
  }

  const result = await db.query(
    `UPDATE feiraco_leads
     SET profile = $1, interests = $2, status = 'qualified', updated_at = NOW()
     WHERE public_id = $3
     RETURNING public_id`,
    [body.data.profile ?? null, body.data.interests, params.data.publicId],
  );

  if (result.rowCount === 0) {
    return reply.status(404).send({ success: false, message: 'Cadastro não encontrado.' });
  }

  return { success: true, status: 'qualified' };
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.status(500).send({ success: false, message: 'Ocorreu um erro. Tente novamente.' });
});

const port = Number(process.env.PORT ?? 3333);
await app.listen({ port, host: '0.0.0.0' });

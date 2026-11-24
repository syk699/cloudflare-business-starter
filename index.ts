import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

type Bindings = { DB: D1Database; FILES: R2Bucket; APP_ORIGIN: string };
const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"], baseUri: ["'self'"], objectSrc: ["'none'"], frameAncestors: ["'none'"],
    formAction: ["'self'"], imgSrc: ["'self'", 'data:', 'https:'], styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"], connectSrc: ["'self'"], upgradeInsecureRequests: [],
  },
  crossOriginEmbedderPolicy: false,
}));
app.use('*', async (c, next) => {
  await cors({ origin: c.env.APP_ORIGIN, credentials: true, allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], allowHeaders: ['Content-Type', 'X-CSRF-Token'] })(c, next);
});

app.get('/health', (c) => c.json({ ok: true, service: 'cloudflare-business-starter' }));

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

app.post('/enquiries', zValidator('json', enquirySchema), async (c) => {
  const { name, email, message } = c.req.valid('json');
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    'INSERT INTO enquiries (id, name, email, message, created_at) VALUES (?, ?, ?, ?, ?)',
  ).bind(id, name, email, message, new Date().toISOString()).run();
  return c.json({ ok: true, id }, 201);
});

app.notFound((c) => c.json({ error: 'Not found' }, 404));
app.onError((error, c) => {
  // Do not expose stack traces or internal exception details to clients.
  console.error('Unhandled API error', error);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;

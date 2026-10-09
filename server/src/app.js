import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { applicationSchema, contactSchema } from './validators/schemas.js';
import { createApplication, createContact, isMongoReady, listContent } from './services/store.js';
import { notifySubmission } from './services/notifications.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
const allowedOrigins = new Set([process.env.CLIENT_ORIGIN || 'http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173']);
if (process.env.CLIENT_ORIGIN) allowedOrigins.add(process.env.CLIENT_ORIGIN);
app.use(helmet({ contentSecurityPolicy: { directives: {
  defaultSrc: ["'self'"], baseUri: ["'self'"], objectSrc: ["'none'"], frameAncestors: ["'none'"],
  imgSrc: ["'self'", 'data:'], styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'], scriptSrc: ["'self'"], connectSrc: ["'self'", ...(process.env.API_ORIGIN ? [process.env.API_ORIGIN] : [])],
} } }));
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.has(origin)) return callback(null, true); return callback(new Error('Origin is not allowed by CORS.')); } }));
app.use(express.json({ limit: '100kb' }));

const submissionLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 6, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many submissions. Please try again later.' } });
const response = (res, data, status = 200) => res.status(status).json({ data });
const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) return res.status(400).json({ message: 'Please check the highlighted information and try again.', issues: result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })) });
  req.validated = result.data; return next();
};

app.get('/api/v1/health', (_req, res) => response(res, { status: 'ok', storage: isMongoReady() ? 'mongodb' : 'demo-memory' }));
app.get('/api/v1/site', (_req, res) => response(res, { name: 'SKALTAIR', description: 'Independent research in law, technology and public policy.', contactDetailsConfirmed: false }));

for (const [route, kind] of [['programs', 'program'], ['publications', 'publication'], ['news', 'news'], ['people', 'person']]) {
  app.get(`/api/v1/${route}`, async (_req, res, next) => { try { return response(res, await listContent(kind)); } catch (error) { return next(error); } });
}

app.post('/api/v1/applications', submissionLimiter, validate(applicationSchema), async (req, res, next) => {
  try {
    const saved = await createApplication(req.validated);
    try { await notifySubmission({ subject: `New SKALTAIR expression of interest · ${saved.reference}`, text: `A new expression of interest has been received.\nReference: ${saved.reference}\nApplicant: ${saved.name}\nEmail: ${saved.email}\nProgramme: ${saved.program}\nTheme: ${saved.theme}\nTitle: ${saved.title}` }); } catch { /* Preserve the saved application if SMTP is temporarily unavailable. */ }
    return response(res, { reference: saved.reference }, 201);
  } catch (error) { return next(error); }
});
app.post('/api/v1/contact', submissionLimiter, validate(contactSchema), async (req, res, next) => {
  try {
    const saved = await createContact(req.validated);
    try { await notifySubmission({ subject: `New SKALTAIR enquiry · ${saved.category}`, text: `A new enquiry has been received.\nName: ${saved.name}\nEmail: ${saved.email}\nCategory: ${saved.category}\nSubject: ${saved.subject}\n\n${saved.message}` }); } catch { /* Preserve the saved enquiry if SMTP is temporarily unavailable. */ }
    return response(res, { received: true }, 201);
  } catch (error) { return next(error); }
});

app.use('/api', (_req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((error, _req, res, _next) => {
  if (error?.code === 11000) return res.status(409).json({ message: 'An item with that identifier already exists.' });
  if (error?.name === 'ValidationError') return res.status(400).json({ message: 'The submitted information is not valid.' });
  if (error?.message?.includes('CORS')) return res.status(403).json({ message: 'This origin is not allowed.' });
  if (process.env.NODE_ENV !== 'test') console.error('API request failed:', error?.message || 'Unknown error');
  return res.status(500).json({ message: 'The server could not complete the request.' });
});

export default app;

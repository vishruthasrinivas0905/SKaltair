import { z } from 'zod';

const cleanString = (max, min = 0) => z.string().trim().min(min).max(max);
export const applicationSchema = z.object({
  name: cleanString(120, 2), email: z.string().trim().email().max(254), phone: z.string().trim().max(40).optional().default(''),
  affiliation: z.string().trim().max(180).optional().default(''), program: z.enum(['short-term', 'mid-term', 'long-term']),
  theme: cleanString(180, 2), title: cleanString(180, 3), summary: cleanString(6000, 30),
  duration: z.string().trim().max(80).optional().default(''), availability: z.string().trim().max(2000).optional().default(''), consent: z.literal(true),
});
export const contactSchema = z.object({
  name: cleanString(120, 2), email: z.string().trim().email().max(254), organisation: z.string().trim().max(180).optional().default(''),
  phone: z.string().trim().max(40).optional().default(''), category: cleanString(90, 2), subject: cleanString(180, 3),
  message: cleanString(5000, 10), consent: z.literal(true),
});

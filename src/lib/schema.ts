import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Must be 5 or more characters long' })
    .max(50, { message: 'Must be 5 or fewer characters long' })
    .trim(),
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  message: z.string().min(2, { message: 'Must be 5 or more characters long' }).trim()
});

export type ContactSchema = typeof contactSchema;

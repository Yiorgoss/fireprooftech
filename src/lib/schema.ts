import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().min(2).email().trim(),
  message: z.string().min(2).trim()

});

export type ContactSchema = typeof contactSchema;

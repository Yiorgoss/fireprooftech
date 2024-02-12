import { z } from "zod";

export const contactSchema = z.object({
  username: z.string().min(2).max(50),
});

export type ContactSchema = typeof contactSchema;

import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z.string().url().nonempty().trim(),
  expiresAt: z.date(),
});

export type CreateUrlActionState = {
  form?: {
    originalUrl?: string;
    expiresAt?: Date;
  };
  errors?: {
    originalUrl?: string;
    expiresAt?: string;
    server?: string;
  };
};

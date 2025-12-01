import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z.url().nonempty().trim(),
  expiresAt: z.date(),
});

export type createUrlActionState = {
  form?: {
    originalUrl?: string;
    expiresAt?: string;
  };
  errors?: {
    originalUrl?: string;
    expiresAt?: string;
    server?: string;
  };
};

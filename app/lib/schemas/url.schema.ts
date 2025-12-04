import { UUID } from "crypto";
import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z.url().nonempty().trim(),
  expiresAt: z.date(),
});

export type CreateUrlActionState = {
  form?: {
    originalUrl?: string;
    expiresAt?: Date | null;
  };
  errors?: {
    originalUrl?: string;
    expiresAt?: string;
    server?: string;
  };
};

export const editUrlSchema = z.object({
  expiresAt: z.date(),
});

export type editUrlActionState = {
  form?: {
    expiresAt?: Date | null;
  };
  errors?: {
    expiresAt?: string;
    server?: string;
  };
};

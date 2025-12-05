import { z } from "zod";

export const createUrlSchema = z.object({
  original_url: z.url().nonempty().trim(),
  expires_at: z.date(),
});

export type CreateUrlActionState = {
  form?: {
    original_url?: string;
    expires_at?: Date | null;
  };
  errors?: {
    original_url?: string;
    expires_at?: string;
    server?: string;
  };
};

export const editUrlSchema = z.object({
  expires_at: z.date(),
});

export type editUrlActionState = {
  form?: {
    expires_at?: Date | null;
  };
  errors?: {
    expires_at?: string;
    server?: string;
  };
};

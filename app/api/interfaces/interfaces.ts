import { z } from "zod";

export const UrlItemSchema = z.object({
  id: z.string(),
  original_url: z.string(),
  short_url: z.string(),
  user_id: z.string(),
  deleted_at: z.string().nullable(),
  expires_at: z.string(),
  notified: z.boolean(),
  created_at: z.string(),
});

export const GetUrlsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    urls: z.array(UrlItemSchema),
  }),
});

export const CreateUrlRequestSchema = z.object({
  original_url: z.url(),
  expires_at: z.date().nullable(),
});

export const CreateUrlResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    short_url: z.string(),
  }),
});

export const EditUrlRequestSchema = z.object({
  expires_at: z.date(),
});

export const EditUrlResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    url: z.object({
      id: z.string(),
      original_url: z.string(),
      short_url: z.string(),
      user_id: z.string(),
      deleted_at: z.string().nullable(),
      expires_at: z.string(),
      notified: z.boolean(),
      created_at: z.string(),
    }),
  }),
});

export type CreateUrlRequestData = z.infer<typeof CreateUrlRequestSchema>;
export type CreateUrlResponse = z.infer<typeof CreateUrlResponseSchema>;
export type EditUrlRequestData = z.infer<typeof EditUrlRequestSchema>;
export type EditUrlResponse = z.infer<typeof EditUrlResponseSchema>;
export type UrlItem = z.infer<typeof UrlItemSchema>;
export type GetUrlsResponse = z.infer<typeof GetUrlsResponseSchema>;
export interface LoginRequestData {
  username: string;
  password: string;
}

export interface ResendMailRequestData {
  email: string;
}

export interface VerifyUserRequestData {
  token: string;
}

export interface RegisterRequestData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const LoginResponseSchema = z.object({
  loggedIn: z.boolean(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RegisterResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
      email: z.string(),
      verified_at: z.string().nullable(),
      updated_at: z.string().nullable(),
      created_at: z.string(),
    }),
  }),
});
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const ResendMailResponseSchema = z.object({
  message: z.string(),
});
export type ResendMailResponse = z.infer<typeof ResendMailResponseSchema>;

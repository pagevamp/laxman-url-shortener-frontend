export interface LoginRequestData {
  username: string;
  password: string;
}

export interface ResendMailRequestData {
  email: string;
}

export interface RegisterRequestData {
  name: string;
  username: string;
  email: string;
  password: string;
}

import { z } from "zod";

export const LoginResponseSchema = z.object({
  access_token: z.string(),
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

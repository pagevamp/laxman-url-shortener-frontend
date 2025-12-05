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
  expires_at: z.date(),
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
      id: z.uuidv4(),
      originalUrl: z.string(),
      short_url: z.string(),
      user_id: z.uuidv4(),
      deleted_at: z.date(),
      expires_at: z.date(),
      notified: z.boolean(),
      created_at: z.date(),
    }),
  }),
});

export type CreateUrlRequestData = z.infer<typeof CreateUrlRequestSchema>;
export type CreateUrlResponse = z.infer<typeof CreateUrlResponseSchema>;
export type UrlItem = z.infer<typeof UrlItemSchema>;
export type GetUrlsResponse = z.infer<typeof GetUrlsResponseSchema>;

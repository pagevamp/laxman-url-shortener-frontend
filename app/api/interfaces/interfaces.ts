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
  expires_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }),
});

export const CreateUrlResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    short_url: z.string(),
  }),
});

export type CreateUrlRequestData = z.infer<typeof CreateUrlRequestSchema>;
export type CreateUrlResponse = z.infer<typeof CreateUrlResponseSchema>;
export type UrlItem = z.infer<typeof UrlItemSchema>;
export type GetUrlsResponse = z.infer<typeof GetUrlsResponseSchema>;

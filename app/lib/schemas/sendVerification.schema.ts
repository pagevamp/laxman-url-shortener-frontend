import { z } from "zod";

export const sendVerificationSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }).trim(),
});

export type sendVerificationActionState = {
  form?: {
    email?: string;
  };
  errors?: {
    email?: string;
    server?: string;
  };
};

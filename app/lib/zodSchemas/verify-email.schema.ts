import { z } from "zod";

export const verifyEmailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export type VerifyEmailActionState = {
  form?: {
    email?: string;
  };
  errors?: {
    email?: string;
  };
};

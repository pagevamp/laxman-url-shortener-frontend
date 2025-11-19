import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().pipe(z.email({ message: "Invalid email address" })),

  password: z.string().min(1, { message: "Password is required" }),
});

export type loginActionState = {
  form?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
};

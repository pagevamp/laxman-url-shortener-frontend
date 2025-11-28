import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Your name must be at least 2 characters long." })
    .max(50, { message: "Your name cannot be longer than 50 characters." })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Your username must be at least 3 characters long." })
    .max(30, { message: "Your username cannot be longer than 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Your username can only include letters, numbers, and underscores.",
    })
    .trim(),
  email: z.email({ message: "Please enter a valid email address." }).trim(),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Your password must include at least one uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Your password must include at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Your password must include at least one special character.",
    })
    .trim(),
});

export type registerActionState = {
  form?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };
  errors?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    server?: string;
  };
};

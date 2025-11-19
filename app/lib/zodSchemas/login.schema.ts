import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "User name cannot be empty" })
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .trim(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type loginActionState = {
  form?: {
    username?: string;
    password?: string;
  };
  errors?: {
    username?: string;
    password?: string;
    server?: string;
  };
};

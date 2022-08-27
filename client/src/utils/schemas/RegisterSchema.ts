import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .max(32)
    .min(3, "Username must have at least 3 characters"),
  password: z
    .string()
    .max(32)
    .min(4, "Password must have at least 4 characters"),
  confirmPassword: z
    .string()
    .max(32)
    .min(4, "Password must have at least 4 characters"),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

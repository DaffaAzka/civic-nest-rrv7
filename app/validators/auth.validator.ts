import z, { email } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    retry_password: z.string(),
  })
  .refine((d) => d.password === d.retry_password, {
    message: "Password must be same.",
    path: ["retry_password"],
  });

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;

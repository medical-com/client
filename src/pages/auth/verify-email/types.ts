import { z } from "zod";

export const verifyEmailSchema = z.object({
  token: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d+$/, "Code must contain only digits"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

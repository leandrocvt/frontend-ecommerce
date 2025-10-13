import { z } from "zod";

export const forgetPassowordSchema = z.object({
  email: z.email({ message: "Digite um e-mail válido." }),
});

export type ForgetPasswordFormValues = z.infer<typeof forgetPassowordSchema>;

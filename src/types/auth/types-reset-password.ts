import { z } from "zod";

export const resetPassowordSchema = z
  .object({
    new_password: z.string().min(1, { message: "Campo obrigatório" }),
    new_confirmation_password: z.string().min(1, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.new_password === data.new_confirmation_password, {
    message: "As senhas são diferentes",
    path: ["new_confirmation_password"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPassowordSchema>;

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};

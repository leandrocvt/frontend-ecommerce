import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Campo obrigatório" }),
    newPassword: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
      .regex(/[a-z]/, "Deve conter letra minúscula")
      .regex(/[A-Z]/, "Deve conter letra maiúscula")
      .regex(/\d/, "Deve conter um número"),
    confirmPassword: z.string().min(1, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha não pode ser igual à senha atual",
    path: ["newPassword"],
  });

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

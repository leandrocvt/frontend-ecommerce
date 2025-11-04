import { z } from "zod";

export const updateNameSchema = z.object({
  firstName: z
    .string()
    .min(2, "Nome inválido")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não pode conter números ou símbolos"),
  lastName: z
    .string()
    .min(2, "Sobrenome inválido")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O sobrenome não pode conter números ou símbolos"),
});

export type UpdateNameFormValues = z.infer<typeof updateNameSchema>;

export type UpdateNamePayload = {
  firstName: string;
  lastName: string;
};

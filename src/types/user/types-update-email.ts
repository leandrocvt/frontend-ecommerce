import { z } from "zod";

export const updateEmailSchema = z
  .object({
    email: z.string().email({ message: "E-mail inválido" }),
    confirm_email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(1, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.email === data.confirm_email, {
    message: "Os e-mails são diferentes",
    path: ["confirm_email"],
  });

export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;

export type UpdateEmailPayload = {
  email: string;
  password: string;
};

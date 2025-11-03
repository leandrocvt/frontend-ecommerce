import { z } from "zod";

export const updatePhoneSchema = z
  .object({
    phone: z
      .string()
      .min(10, { message: "Telefone inválido" })
      .transform((val) => val.replace(/\D/g, "")) 
      .refine((val) => /^\d+$/.test(val), { message: "Apenas números são permitidos" }),
    confirm_phone: z
      .string()
      .min(10, { message: "Telefone inválido" })
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => /^\d+$/.test(val), { message: "Apenas números são permitidos" }),
  })
  .refine((data) => data.phone === data.confirm_phone, {
    message: "Os telefones são diferentes",
    path: ["confirm_phone"],
  });

export type UpdatePhoneFormValues = z.infer<typeof updatePhoneSchema>;

export type UpdatePhonePayload = {
  phone: string;
};

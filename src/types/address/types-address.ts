import { z } from "zod";

export const addressSchema = z.object({
  id: z.number().optional(),
  alias: z.string().min(1, "Apelido do endereço é obrigatório"),
  recipientName: z.string().min(2, "Nome do destinatário é obrigatório"),

  phoneNumber: z
    .string()
    .min(1, "Celular é obrigatório")
    .transform((val) => val.replace(/\D/g, "")) // 🔥 remove máscara
    .refine((val) => /^(\d{10,11})$/.test(val), {
      message: "Número de celular inválido",
    }),

  zipCode: z
    .string()
    .min(8, "CEP inválido")
    .regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido"),

  road: z.string().min(2, "Rua/Avenida é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Use a sigla do estado, ex: SP"),
  complement: z.string().optional(),
});

export type AddressSchemaFormValues = z.infer<typeof addressSchema>;

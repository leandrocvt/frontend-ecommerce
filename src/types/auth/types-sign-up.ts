import { z } from "zod";
import { validateIdentification } from "@/lib";
import {
  FieldErrors,
  UseFormRegister,
  Control,
  UseFormSetValue,
} from "react-hook-form";

export const signUpSchema = z
  .object({
    first_name: z.string().min(2, "Primeiro nome é obrigatório"),
    last_name: z.string().min(2, "Sobrenome é obrigatório"),
    cpf: z
      .string()
      .min(1, { message: "CPF é obrigatório" })
      .refine((cpf) => validateIdentification(cpf.replace(/\D/g, "")), {
        message: "CPF inválido",
      })
      .transform((cpf) => cpf.replace(/\D/g, "")),
    birth_date: z
      .string()
      .min(1, { message: "Data de nascimento é obrigatória" })
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida")
      .refine(
        (date) => {
          const [day, month, year] = date.split("/").map(Number);
          const birthDate = new Date(year, month - 1, day);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          return age >= 18 && age <= 95;
        },
        { message: "Idade deve ser entre 18 e 95 anos" }
      )
      .transform((date) => {
        const [day, month, year] = date.split("/").map(Number);
        return `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
      }),
    email: z.string().email({ message: "Digite um e-mail válido." }),
    phone: z
      .string()
      .min(1, { message: "Telefone é obrigatório" })
      .regex(/^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/, "Número de telefone inválido"),
    address: z.object({
      alias: z.string().min(1, "Apelido obrigatório"),
      recipientName: z.string().min(1, "Nome do destinatário obrigatório"),
      phoneNumber: z
        .string()
        .min(10, "Celular inválido")
        .regex(/^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/, "Número inválido"),
      zip_code: z.string().min(8, "CEP inválido"),
      state: z.string().min(2, "Estado obrigatório"),
      city: z.string().min(2, "Cidade obrigatória"),
      neighborhood: z.string().min(2, "Bairro obrigatório"),
      road: z.string().min(2, "Endereço obrigatório"),
      number: z.string().min(1, "Número obrigatório"),
      complement: z.string().optional(),
    }),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/\d/, "Senha deve conter pelo menos um número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Senha deve conter pelo menos um caractere especial"
      ),
    confirmation_password: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmation_password, {
    message: "As senhas são diferentes",
    path: ["confirmation_password"],
  });

export type SignUpSchemaFormValues = z.infer<typeof signUpSchema>;

export interface FieldFormsSignUpProps {
  register: UseFormRegister<SignUpSchemaFormValues>;
  errors: FieldErrors<SignUpSchemaFormValues>;
  control?: Control<SignUpSchemaFormValues>;
  setValue?: UseFormSetValue<SignUpSchemaFormValues>;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: {
    alias: string;
    recipientName: string;
    phoneNumber: string;
    road: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    number: string;
    complement: string;
  };
}

export type SignUpFormValues = SignUpSchemaFormValues;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { LoaderCircle } from "lucide-react";
import { validateIdentification } from "@/lib";

const schema = z.object({
  first_name: z.string().min(2, "Nome obrigatório"),
  last_name: z.string().min(2, "Sobrenome obrigatório"),
  cpf: z.string().nonempty("CPF obrigatório").refine(validateIdentification, {
    message: "CPF inválido",
  }),
  birth_date: z.string().nonempty("Data obrigatória"),
  phone: z.string().min(10, "Telefone inválido"),
});

type FormValues = z.infer<typeof schema>;

export function StepPersonalData({
  onNext,
  defaultValues,
}: {
  onNext: (data: FormValues) => Promise<void> | void;
  onPrev: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const { register, handleSubmit, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const values = watch();
  const isFormValid =
    values.first_name?.length >= 2 &&
    values.last_name?.length >= 2 &&
    validateIdentification(values.cpf || "") &&
    values.birth_date &&
    values.phone?.length >= 10;

  const onSubmitHandler = async (data: FormValues) => {
    try {
      setIsPending(true);
      await onNext(data);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col text-left mt-10">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-7">
        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Nome*" {...register("first_name")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Sobrenome*" {...register("last_name")} />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="CPF ou CNPJ*" {...register("cpf")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field type="date" placeholder="Data de Nascimento*" {...register("birth_date")} />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Celular*" {...register("phone")} />
          </Input.Prefix>

          <Button
            type="submit"
            disabled={isPending || !isFormValid}
            variant={isPending || !isFormValid ? "disabled" : "default"}
            className="h-12 w-full"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Continuar"}
          </Button>
        </div>
      </form>

      <div className="flex justify-end mt-2">
        <Button
          type="button"
          variant="link"
          className="text-sm p-0"
          onClick={() => router.push("/login")} 
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}

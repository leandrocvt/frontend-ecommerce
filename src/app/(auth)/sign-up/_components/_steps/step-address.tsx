"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { SignUpSchemaFormValues } from "@/types/auth";

type FormValues = SignUpSchemaFormValues["address"];

const schema = z.object({
  alias: z.string().nonempty("Apelido obrigatório"),
  zip_code: z.string().min(8, "CEP obrigatório"), 
  road: z.string().nonempty("Endereço obrigatório"),
  number: z.string().nonempty("Número obrigatório"),
  neighborhood: z.string().nonempty("Bairro obrigatório"),
  city: z.string().nonempty("Cidade obrigatória"),
  state: z.string().nonempty("Estado obrigatório"),
  complement: z.string().optional(),
});

export function StepAddress({
  onNext,
  onPrev,
  defaultValues,
}: {
  onNext: (data: FormValues) => void;
  onPrev: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}) {
  const { register, handleSubmit, formState, getValues } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  return (
    <div className="flex flex-col text-left mt-10">
      <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <Input.Prefix>
            <Input.Field placeholder="Apelido do endereço*" {...register("alias")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="CEP*" {...register("zip_code")} />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Endereço*" {...register("road")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Número*" {...register("number")} />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Bairro*" {...register("neighborhood")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Cidade*" {...register("city")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Estado*" {...register("state")} />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Referência" {...register("complement")} />
          </Input.Prefix>
          <Button type="submit" className="h-12" disabled={!formState.isValid}>
            Continuar
          </Button>
        </div>
      </form>

      <div className="flex justify-end mt-2">
        <Button type="button" onClick={() => onPrev(getValues())} className="text-sm p-0" variant="link">
          Voltar
        </Button>
      </div>
    </div>
  );
}

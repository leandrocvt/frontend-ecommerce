"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { useFetchCep } from "@/hooks/address";
import { PhoneField } from "@/components/input/_ui";
import { signUpSchema, SignUpSchemaFormValues } from "@/types/auth";

type FormValues = SignUpSchemaFormValues["address"];
const schema = signUpSchema.shape.address;

export function StepAddress({
  onNext,
  onPrev,
  defaultValues,
}: {
  onNext: (data: FormValues) => void;
  onPrev: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}) {
  const { searchCep, loading: loadingCep } = useFetchCep();

  const { register, handleSubmit, formState, control, setValue, getValues } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: "onChange",
      defaultValues,
    });

  async function handleCepBlur() {
    const cep = getValues("zip_code")?.replace(/\D/g, "");
    if (cep?.length !== 8) return;

    const data = await searchCep(cep);
    if (!data) return;

    setValue("road", data.logradouro || "");
    setValue("neighborhood", data.bairro || "");
    setValue("city", data.localidade || "");
    setValue("state", data.uf || "");
    if (data.complemento) setValue("complement", data.complemento);
  }

  return (
    <div className="flex flex-col text-left mt-10">
      <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
        {/* Linha 1: Apelido e telefone */}
        <div className="grid md:grid-cols-2 gap-3">
          <Input.Prefix>
            <Input.Field placeholder="Apelido do endereço*" {...register("alias")} />
          </Input.Prefix>

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input.Prefix>
                <PhoneField {...field} value={field.value || ""} />
              </Input.Prefix>
            )}
          />
        </div>

        {/* Linha 2: Nome e CEP */}
        <div className="grid md:grid-cols-2 gap-3">
          <Input.Prefix>
            <Input.Field placeholder="Nome do destinatário*" {...register("recipientName")} />
          </Input.Prefix>

          <Controller
            name="zip_code"
            control={control}
            render={({ field }) => (
              <Input.Prefix>
                <Input.CepField
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={handleCepBlur}
                  placeholder="00000-000"
                  disabled={loadingCep}
                />
              </Input.Prefix>
            )}
          />
        </div>

        {/* Linha 3: Endereço e número */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Endereço*" {...register("road")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Número*" {...register("number")} />
          </Input.Prefix>
        </div>

        {/* Linha 4: Bairro, cidade e estado */}
        <div className="grid md:grid-cols-3 gap-4">
          <Input.Prefix>
            <Input.Field placeholder="Bairro*" {...register("neighborhood")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="Cidade*" {...register("city")} />
          </Input.Prefix>
          <Input.Prefix>
            <Input.Field placeholder="UF*" maxLength={2} {...register("state")} />
          </Input.Prefix>
        </div>

        {/* Linha 5: Complemento e botão */}
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
        <Button
          type="button"
          onClick={() => onPrev(getValues())}
          className="text-sm p-0"
          variant="link"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}

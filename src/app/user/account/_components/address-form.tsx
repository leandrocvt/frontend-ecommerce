"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { addressSchema, AddressSchemaFormValues } from "@/types/address";

interface AddressFormProps {
  mode: "add" | "edit";
  defaultValues?: AddressSchemaFormValues;
  onSubmit: (data: AddressSchemaFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AddressFormProps) {
  const [noNumber, setNoNumber] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      alias: "",
      recipientName: "",
      phoneNumber: "",
      zipCode: "",
      road: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      complement: "",
      ...(defaultValues || {}),
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setNoNumber(!defaultValues.number);
    } else {
      reset({
        alias: "",
        recipientName: "",
        phoneNumber: "",
        zipCode: "",
        road: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
      });
      setNoNumber(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onFormSubmit = (data: AddressSchemaFormValues) => {
    const cleanPhone = data.phoneNumber.replace(/\D/g, ""); 
    const final = {
      ...data,
      number: noNumber ? "" : data.number,
      phoneNumber: cleanPhone,
    };
    onSubmit(final);
  };

  const onError = () => {
    const firstError = Object.values(errors)[0]?.message as string | undefined;
    if (firstError) toast.error(firstError);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onError)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input.Prefix>
            <Input.Field
              placeholder="Apelido do endereço*"
              {...register("alias")}
            />
          </Input.Prefix>
          {errors.alias && (
            <p className="text-xs text-red-500 mt-1">{errors.alias.message}</p>
          )}
        </div>

        <div>
          <Input.Prefix>
            <Input.Field
              placeholder="Nome do destinatário"
              {...register("recipientName")}
            />
          </Input.Prefix>
          {errors.recipientName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input.Prefix>
                <Input.PhoneField
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </Input.Prefix>
            )}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <Input.Prefix>
                <Input.CepField
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="00000-000"
                />
              </Input.Prefix>
            )}
          />
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:underline mt-1"
          >
            Não sei meu CEP
          </a>
          {errors.zipCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <Input.Prefix>
            <Input.Field placeholder="Rua / Avenida" {...register("road")} />
          </Input.Prefix>
          {errors.road && (
            <p className="text-xs text-red-500 mt-1">{errors.road.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <Input.Prefix>
            <Input.Field
              placeholder="Número"
              {...register("number")}
              value={noNumber ? "" : undefined}
              disabled={noNumber}
            />
          </Input.Prefix>

          <label className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Checkbox
              checked={noNumber}
              onCheckedChange={(checked) => {
                setNoNumber(!!checked);
              }}
            />
            Sem número
          </label>
          {errors.number && !noNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.number.message}</p>
          )}
        </div>

        <div>
          <Input.Prefix>
            <Input.Field placeholder="Bairro" {...register("neighborhood")} />
          </Input.Prefix>
          {errors.neighborhood && (
            <p className="text-xs text-red-500 mt-1">
              {errors.neighborhood.message}
            </p>
          )}
        </div>

        <div>
          <Input.Prefix>
            <Input.Field placeholder="Cidade" {...register("city")} />
          </Input.Prefix>
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input.Prefix>
                <Input.UfField
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="UF"
                />
              </Input.Prefix>
            )}
          />
          {errors.state && (
            <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Input.Prefix>
            <Input.Field
              placeholder="Referência (opcional)"
              {...register("complement")}
            />
          </Input.Prefix>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-2 border-black text-black hover:bg-gray-100 w-32 h-12"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white hover:bg-zinc-800 w-32 h-12"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}

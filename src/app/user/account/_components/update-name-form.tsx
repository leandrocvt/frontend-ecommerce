"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserProfileQuery, useUpdateNameMutate } from "@/hooks/user";
import {
  updateNameSchema,
  UpdateNameFormValues,
} from "@/types/user/types-update-name";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Loader2 } from "lucide-react";

export function UpdateNameForm() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { mutate, isPending } = useUpdateNameMutate();
  const { data: profile, isLoading } = useUserProfileQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateNameFormValues>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
      });
    }
    setIsClient(true);
  }, [profile, reset]);

  function onSubmit(data: UpdateNameFormValues) {
    mutate(data);
  }

  if (!isClient || isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );

  const formattedDate = profile?.birthDate
    ? new Date(profile.birthDate).toLocaleDateString("pt-BR")
    : "";
  const maskedCpf = profile?.cpf
    ? profile.cpf.replace(/^(\d{2})\d{7}(\d{2})$/, "$1******$2")
    : "";

  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Alterar dados pessoais"
        description="Atualize seu nome e sobrenome. Seu CPF e data de nascimento não podem ser alterados."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[#F8F8F6] border-2 rounded-[10px] p-6 space-y-4 2xl:w-3/5"
      >
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-black mb-1">CPF</p>
            <Input.Prefix>
              <Input.Field
                className="text-[#B5B9BE]"
                type="text"
                value={maskedCpf}
                disabled
                readOnly
              />
            </Input.Prefix>
          </div>

          <div>
            <p className="text-sm text-black mb-1">Data de nascimento</p>
            <Input.Prefix>
              <Input.Field
                type="text"
                value={formattedDate}
                disabled
                readOnly
                className="text-[#B5B9BE]"
              />
            </Input.Prefix>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input.Prefix>
              <Input.Field
                type="text"
                placeholder="Nome"
                {...register("firstName")}
              />
            </Input.Prefix>
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Input.Prefix>
              <Input.Field
                type="text"
                placeholder="Sobrenome"
                {...register("lastName")}
              />
            </Input.Prefix>
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row mt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full lg:w-56 h-12 text-sm"
          >
            {isPending ? "Salvando..." : "Alterar dados"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/user/account")}
            className="w-full lg:w-32 h-12 text-sm border-2 border-black font-medium"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
}

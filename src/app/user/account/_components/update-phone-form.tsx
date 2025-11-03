"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserProfileQuery, useUpdatePhoneMutate } from "@/hooks/user";
import {
  updatePhoneSchema,
  UpdatePhoneFormValues,
} from "@/types/user/types-update-phone";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Loader2 } from "lucide-react";
import { PhoneField } from "@/components/input/_ui";

export function UpdatePhoneForm() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { mutate, isPending } = useUpdatePhoneMutate();
  const { data: profile, isLoading } = useUserProfileQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePhoneFormValues>({
    resolver: zodResolver(updatePhoneSchema),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  function cleanPhone(phone: string) {
    return phone.replace(/\D/g, "");
  }

  function onSubmit(data: UpdatePhoneFormValues) {
    const clean = cleanPhone(data.phone);
    mutate({ phone: clean });
  }

  if (!isClient || isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );

  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Alterar telefone"
        description="Cadastre o novo telefone. Ele poderá ser utilizado para recuperar sua conta."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[#F8F8F6] border-2 rounded-[10px] p-6 space-y-4 2xl:w-3/5"
      >
        <div>
          <p className="text-sm font-medium mb-5">Telefone atual</p>
          <Input.Prefix>
            <Input.Field
              value={profile?.phone || ""}
              disabled
              className="text-[#000000]"
            />
          </Input.Prefix>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input.Prefix>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneField
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Novo telefone*"
                  />
                )}
              />
            </Input.Prefix>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Input.Prefix>
              <Controller
                name="confirm_phone"
                control={control}
                render={({ field }) => (
                  <PhoneField
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Confirme o novo telefone*"
                  />
                )}
              />
            </Input.Prefix>
            {errors.confirm_phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirm_phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full lg:w-56 h-12 text-sm"
          >
            {isPending ? "Salvando..." : "Alterar telefone"}
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

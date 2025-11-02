"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEmailMutate } from "@/hooks/user";
import { useUserProfileQuery } from "@/hooks/user";
import {
  updateEmailSchema,
  UpdateEmailFormValues,
} from "@/types/user/types-update-email";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpdateEmailForm() {
  const router = useRouter();
  const { mutate, isPending } = useUpdateEmailMutate();
  const { data: profile, isLoading } = useUserProfileQuery();
  const [showPassword, setShowPassword] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
  });

  function onSubmit(data: UpdateEmailFormValues) {
    mutate({
      email: data.email,
      password: data.password,
    });
  }

  if (!isClient || isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );

  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Alterar e-mail"
        description="Atualize o e-mail. Ele será utilizado para acessar sua conta."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[#F8F8F6] border-2 rounded-[10px] p-6 space-y-4 2xl:w-3/5"
      >
        <div>
          <p className="text-sm font-medium mb-5">E-mail atual</p>
          <Input.Prefix>
            <Input.Field
              value={profile?.email || ""}
              disabled
              className="text-[#000000]"
            />
          </Input.Prefix>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input.Prefix>
              <Input.Field placeholder="Novo e-mail*" {...register("email")} />
            </Input.Prefix>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input.Prefix>
              <Input.Field
                placeholder="Confirme o e-mail*"
                {...register("confirm_email")}
              />
            </Input.Prefix>
            {errors.confirm_email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirm_email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Input.Prefix>
            <Input.PasswordField
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha*"
              {...register("password")}
              onToggleVisibility={() => setShowPassword((prev) => !prev)}
              isVisible={showPassword}
            />
          </Input.Prefix>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full lg:w-56 h-12 text-sm"
          >
            {isPending ? "Salvando..." : "Alterar e-mail"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/user/account")}
            className="w-full lg:w-32  h-12 text-sm border-2 border-black font-medium"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
}

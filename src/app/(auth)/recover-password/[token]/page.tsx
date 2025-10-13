import { Metadata } from "next";
import { Suspense } from "react";
import { FormResetPassword } from "../_components/form-reset-password";

export const metadata: Metadata = {
  title: "Nova senha |",
};

export default function RecoverPasswordTokenPage() {
  return (
    <section className="w-screen min-h-screen flex flex-col items-center justify-center">
      <Suspense fallback={<div>Carregando...</div>}>
        <FormResetPassword />
      </Suspense>
    </section>
  );
}

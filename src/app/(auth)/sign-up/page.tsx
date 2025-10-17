import { Metadata } from "next";
import { FormDataSignUp } from "./_components/form-data-sign-up";

export const metadata: Metadata = {
  title: "Cadastro de Usuários |",
};

export default function SignUp() {
  return (
    <section className="w-[440px] min-h-screen md:h-screen flex flex-col items-center justify-center">
      <FormDataSignUp />
    </section>
  );
}

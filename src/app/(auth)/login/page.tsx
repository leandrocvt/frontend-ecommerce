import { Metadata } from "next";
import { FormDataLogin } from "./_components/form-data-login";

export const metadata: Metadata = {
  title: "Login |",
};

export default function Login() {
  return (
    <section className="w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FormDataLogin />
    </section>
  );
}

"use client";

import { useState } from "react";
import { StepPersonalData } from "./_steps/step-personal-data";
import { StepAddress } from "./_steps/step-address";
import { StepAccessSecurity } from "./_steps/step-access-security";
import { useSignUpMutate } from "@/hooks/auth";
import { toSignUpPayload } from "@/services/auth";
import { SignUpFormValues, SignUpSchemaFormValues } from "@/types/auth";

export function FormDataSignUp() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<SignUpFormValues>>({});
  const { mutate, isPending } = useSignUpMutate();

  const handleNext = <T extends object>(data: T) => {
    setFormData((prev) => {
      if (step === 1)
        return { ...prev, address: data } as Partial<SignUpFormValues>;
      return { ...prev, ...data } as Partial<SignUpFormValues>;
    });
    setStep((prev) => prev + 1);
  };

  const handlePrev = <T extends object>(data?: T) => {
    if (data) setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev - 1);
  };

  const handleSubmitAll = (data: Partial<SignUpFormValues>) => {
    const finalData = {
      ...formData,
      ...data,
      address: { ...formData.address, ...data.address },
    } as SignUpSchemaFormValues;

    const payload = toSignUpPayload(finalData);
    mutate(payload);
  };

  const steps = [
    <StepPersonalData
      key="1"
      onNext={handleNext}
      onPrev={(data) => handlePrev(data)}
      defaultValues={{
        first_name: formData.first_name ?? "",
        last_name: formData.last_name ?? "",
        cpf: formData.cpf ?? "",
        phone: formData.phone ?? "",
        birth_date: formData.birth_date ?? "",
      }}
    />,
    <StepAddress
      key="2"
      onNext={handleNext}
      onPrev={(data) => handlePrev(data)}
      defaultValues={formData.address ?? {}}
    />,
    <StepAccessSecurity
      key="3"
      onPrev={(data) => handlePrev(data)}
      onSubmit={handleSubmitAll}
      isPending={isPending}
      defaultValues={{
        email: formData.email ?? "",
      }}
    />,
  ];

  return (
    <div className="w-full px-10 md:w-[700px] py-[40px] md:border-2 border-[#F8F8F6] rounded-[10px]">
      <h1 className="text-[22px] md:text-2xl mb-4">Vamos criar sua conta</h1>

      <div className="flex justify-between">
        <p className="text-gray-500 text-sm">
          Lorem Ipsum is simply dummy text of the
        </p>
        <p className="text-xs font-medium text-[#B5B9BE]">
          Etapa {step + 1} de {steps.length}
        </p>
      </div>

      {steps[step]}
    </div>
  );
}

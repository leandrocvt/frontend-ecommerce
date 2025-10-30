"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilSimple } from "phosphor-react";

interface UserProfileCardProps {
  cpf: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
}

export function UserProfileCard({
  cpf,
  firstName,
  lastName,
  birthDate,
  email,
  phone,
}: UserProfileCardProps) {
  const maskedCpf = cpf.replace(/^(\d{2})\d{7}(\d{2})$/, "$1******$2");
  const maskedPhone = phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");

  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (birthDate) {
      setFormattedDate(new Date(birthDate).toLocaleDateString("pt-BR"));
    }
  }, [birthDate]);

  return (
    <div className="flex flex-col gap-8">
      {/* DADOS DE ACESSO */}
      <div className="border-[#F8F8F6] border-2 rounded-[10px] p-6">
        <h3 className="text-sm font-semibold mb-6">Dados de acesso</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-sm">
          {/* EMAIL */}
          <div>
            <div className="flex items-center justify-between w-full md:w-44">
              <p className="text-black">Email</p>
              <button className="text-[#254AA5] text-xs flex items-center gap-1 hover:underline cursor-pointer">
                Alterar e-mail <PencilSimple className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-muted-foreground mt-1">{email}</p>
          </div>

          {/* TELEFONE */}
          <div>
            <div className="flex items-center justify-between w-full md:w-44">
              <p className="text-black">Telefone</p>
              <button className="text-[#254AA5] text-xs flex items-center gap-1 hover:underline cursor-pointer">
                Alterar telefone <PencilSimple className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-muted-foreground mt-1">{maskedPhone}</p>
          </div>

          {/* SENHA */}
          <div>
            <div className="flex items-center justify-between w-full md:w-44">
              <p className="text-black">Senha</p>
              <button className="text-[#254AA5] text-xs flex items-center gap-1 hover:underline cursor-pointer">
                Alterar senha <PencilSimple className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-muted-foreground mt-1">************</p>
          </div>
        </div>
      </div>

      {/* DADOS PESSOAIS */}
      <div className="border-[#F8F8F6] border-2 rounded-[10px] p-6">
        <h3 className="text-sm font-semibold mb-6">Dados pessoais</h3>

        <div className="grid sm:grid-cols-3 gap-y-4 text-sm">
          <div>
            <p className="text-black">CPF</p>
            <p className="text-muted-foreground mt-1">{maskedCpf}</p>
          </div>
          <div>
            <p className="text-black">Nome</p>
            <p className="text-muted-foreground mt-1">{firstName}</p>
          </div>
          <div>
            <p className="text-black">Sobrenome</p>
            <p className="text-muted-foreground mt-1">{lastName}</p>
          </div>
        </div>

        <div className="mt-6 text-sm">
          <p className="text-black">Data de Nascimento</p>
          <p className="text-muted-foreground mt-1">{formattedDate}</p>
        </div>

        <Button className="w-full lg:w-48 mt-6 flex items-center gap-2 bg-black text-white hover:bg-zinc-800 py-2 h-12 font-light text-xs">
          Alterar dados pessoais <PencilSimple className="w-4 h-4" />
        </Button>

      </div>
    </div>
  );
}

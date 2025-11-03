"use client";

import { useEffect, useState } from "react";
import { useUserProfileQuery } from "@/hooks/user";
import { Loader2 } from "lucide-react";
import { UserProfileCard } from "./_components/user-profile-card";
import { SectionHeader } from "@/components";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading, isError } = useUserProfileQuery();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-center text-sm text-muted-foreground">
        Erro ao carregar dados do perfil.
      </div>
    );

  return (
    <div>
      <SectionHeader
        title="Meu cadastro"
        description="Acesse ou altere seus dados cadastrais da sua conta."
      />
      <UserProfileCard
        cpf={data?.cpf}
        firstName={data?.firstName}
        lastName={data?.lastName}
        birthDate={data?.birthDate}
        email={data?.email}
        phone={data?.phone}
      />
    </div>
  );
}

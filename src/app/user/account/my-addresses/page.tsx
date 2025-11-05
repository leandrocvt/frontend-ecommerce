"use client";

import { Loader2 } from "lucide-react";
import { useUserProfileQuery } from "@/hooks/user";
import { SectionHeader } from "@/components";
import { AddressCard } from "@/components";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyAddressesPage() {
  const { data, isLoading, isError } = useUserProfileQuery();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.replace("/login");
  }, [router]);

  if (!isClient || isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-center text-sm text-muted-foreground">
        Erro ao carregar endereços.
      </div>
    );

  const addresses = data.addresses ?? [];

  return (
    <div>
      <SectionHeader
        title="Meus endereços"
        description="Acesse ou altere seus endereços."
      />

      <div className="flex flex-col gap-6">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <AddressCard
              key={index}
              alias={address.alias}
              road={address.road}
              neighborhood={address.neighborhood}
              city={address.city}
              state={address.state}
              zipCode={address.zipCode}
              number={address.number}
              complement={address.complement}
              onEdit={() => router.push(`/user/account/edit-address/${index}`)}
              onDelete={() => console.log("Excluir", address)}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhum endereço cadastrado.
          </p>
        )}
      </div>

      <Button
        onClick={() => router.push("/user/account/add-address")}
        className="w-full lg:w-48 mt-6 flex items-center gap-2 bg-black text-white hover:bg-zinc-800 py-2 h-12 font-light text-xs"
      >
        Adicionar novo endereço
      </Button>
    </div>
  );
}

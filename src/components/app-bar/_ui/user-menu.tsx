"use client";

import { useRouter } from "next/navigation";
import {
  
  Heart,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import IconUser from "@/assets/icons/icon-user.svg";
import {
  ArrowsClockwise,
  ChatCenteredDots,
  ClipboardText,
  UserCirclePlus,
} from "phosphor-react";
import Cookies from "js-cookie";
import { useUserProfile } from "@/hooks/auth";

interface UserMenuProps {
  onLogin?: () => void;
  onLogout?: () => void;
}

export function UserMenu({ onLogin, onLogout }: UserMenuProps) {
  const router = useRouter();
  const { user, isLoggedIn } = useUserProfile();

  const handleLoginClick = () => {
    if (onLogin) onLogin();
    router.push("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    if (onLogout) onLogout();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={IconUser}
          alt="Ícone de usuário"
          className="w-[22px] h-[22px] cursor-pointer hover:opacity-80 transition"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-52 rounded-2xl border mt-3 p-2 shadow-lg"
      >
        {/* 🔹 Primeiro item muda dependendo do login */}
        <DropdownMenuItem
          onClick={!isLoggedIn ? handleLoginClick : undefined}
          className="flex items-center gap-2 text-black hover:bg-gray-100 cursor-pointer"
        >
          <Image
            src={IconUser}
            alt="Ícone de usuário"
            className="w-[16px] h-[16px]"
          />
          {isLoggedIn
            ? `Olá, ${user?.firstName || user?.name || "usuário"}`
            : "Entre ou cadastre-se"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Restante dos itens (mantém o mesmo layout) */}
        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ClipboardText size={18} color="black" />
          Meus pedidos
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ArrowsClockwise size={18} color="black" />
          Trocas e devoluções
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <UserCirclePlus size={18} color="black" />
          Minha conta
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ChatCenteredDots size={18} color="black" />
          Atendimento
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <Heart size={18} color="black" />
          Meus favoritos
        </DropdownMenuItem>

        {/* 🔹 Adiciona o "Sair" apenas se estiver logado */}
        {isLoggedIn && (
          <>
   
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50"
            >
              <LogOut size={18} color="black"  className="text-normal" strokeWidth={1.5} />
              Sair
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Heart, LogOut } from "lucide-react";
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
  Monitor,
  UserCirclePlus,
} from "phosphor-react";
import Cookies from "js-cookie";
import { useUserProfileQuery } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

interface UserMenuProps {
  onLogin?: () => void;
  onLogout?: () => void;
}

export function UserMenu({ onLogin }: UserMenuProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useUserProfileQuery();
  const isLoggedIn = !!data;

  const handleLoginClick = () => {
    if (onLogin) onLogin();
    router.push("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    queryClient.clear();
    router.push("/");
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      router.push("/user/account");
    } else {
      handleLoginClick();
    }
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
            ? `Olá, ${data?.firstName || data?.firstName || "usuário"}`
            : "Entre ou cadastre-se"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ClipboardText color="black" />
          Meus pedidos
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ArrowsClockwise color="black" />
          Trocas e devoluções
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAccountClick}
          className="flex items-center gap-2 text-black hover:bg-gray-100 cursor-pointer"
        >
          <UserCirclePlus color="black" />
          Minha conta
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <ChatCenteredDots color="black" />
          Atendimento
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
          <Heart color="black" />
          Meus favoritos
        </DropdownMenuItem>

        {isLoggedIn && data?.role === "ROLE_ADMIN" && (
          <DropdownMenuItem
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-black hover:bg-gray-100 cursor-pointer"
          >
            <Monitor color="black" />
            Painel administrativo
          </DropdownMenuItem>
        )}

        {isLoggedIn && (
          <>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50"
            >
              <LogOut color="black" className="text-normal" strokeWidth={1.5} />
              Sair
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

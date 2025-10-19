"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  ClipboardList,
  RefreshCcw,
  User,
  MessageSquare,
  Heart,
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

interface UserMenuProps {
  isLoggedIn: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function UserMenu({ isLoggedIn, onLogin, onLogout }: UserMenuProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    if (onLogin) onLogin();
    router.push("/login");
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
        {!isLoggedIn ? (
          <>
            <DropdownMenuItem
              onClick={handleLoginClick}
              className="flex items-center gap-2 text-black hover:bg-gray-100 cursor-pointer"
            >
              <Image
                src={IconUser}
                alt="Ícone de usuário"
                className="w-[16px] h-[16px]"
              />
              Entre ou cadastre-se
            </DropdownMenuItem>

            <DropdownMenuSeparator />

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
          </>
        ) : (
          <>
            <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
              <ClipboardList size={18} color="black" />
              Meus pedidos
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
              <RefreshCcw size={18} color="black" />
              Trocas e devoluções
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
              <User size={18} color="black" />
              Minha conta
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-100">
              <MessageSquare size={18} color="black" />
              Atendimento
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} color="#dc2626" />
              Sair
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

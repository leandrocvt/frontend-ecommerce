"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  ChevronRight,
  ChevronLeft,
  Package,
  Settings,
  HelpCircle,
} from "lucide-react";
import { UserCircle } from "phosphor-react";
import { itemsMobileMenu } from "@/constants";
import { useUserProfile } from "@/hooks/auth";
import Cookies from "js-cookie";

const iconMap = {
  UserCircle,
  ChevronRight,
  Package,
  Settings,
  HelpCircle,
};

export function Menu() {
  const [open, setOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn } = useUserProfile();

  const handleNavigate = (path: string) => {
    setOpen(false);
    setShowAccountMenu(false);
    router.push(path);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setOpen(false);
    setShowAccountMenu(false);
    window.location.reload();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="cursor-pointer flex lg:hidden text-black" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col lg:hidden px-0 text-black border-none"
      >
        <SheetTitle />
        <SheetDescription className="sr-only">
          Navegação principal do site e opções de usuário.
        </SheetDescription>

        {/* 🔹 Menu principal */}
        {!showAccountMenu && (
          <>
            {/* Header do usuário */}
            <div className="border-b">
              <button
                onClick={() =>
                  isLoggedIn
                    ? setShowAccountMenu(true)
                    : handleNavigate("/login")
                }
                className="w-full flex justify-between items-center p-4 text-sm hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <UserCircle size={22} />
                  <span>
                    {isLoggedIn
                      ? `Olá, ${user?.firstName || user?.name || "usuário"}`
                      : "Entrar ou cadastrar"}
                  </span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Seções do menu principal */}
            {itemsMobileMenu.map((section) => {
              if (section.section === "auth") return null; // já tratado acima

              if (section.items) {
                return (
                  <div
                    key={section.id}
                    className={
                      section.section === "main" ? "border-b py-2" : "pt-2"
                    }
                  >
                    {section.items.map((item) => {
                      const Icon = item.icon
                        ? iconMap[item.icon as keyof typeof iconMap]
                        : null;

                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavigate(item.path)}
                          className="w-full flex justify-between items-center p-4 text-sm hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            {section.section === "support" && Icon && (
                              <Icon size={22} strokeWidth={1.6} />
                            )}
                            <span>{item.label}</span>
                          </div>
                          {section.section === "main" && (
                            <ChevronRight size={18} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              }
            })}
          </>
        )}

        {/* 🔹 Submenu do usuário (conta) */}
        {showAccountMenu && (
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b">
              <button
                onClick={() => setShowAccountMenu(false)}
                className="flex items-center gap-1 text-sm"
              >
                <ChevronLeft size={18} />
                <span>Voltar</span>
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm">
              <h2 className="font-medium text-lg">
                {user?.firstName || "Usuário"}
              </h2>

              <button
                onClick={() => handleNavigate("/meus-pedidos")}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Meus pedidos
              </button>
              <button
                onClick={() => handleNavigate("/trocas")}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Trocas e devoluções
              </button>
              <button
                onClick={() => handleNavigate("/minha-conta")}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Minha conta
              </button>
              <button
                onClick={() => handleNavigate("/favoritos")}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Meus favoritos
              </button>
              <button
                onClick={() => handleNavigate("/atendimento")}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Atendimento
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-black/50 text-left hover:text-black"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

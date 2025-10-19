"use client";

import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { InnerContainer } from "../ui";
import { Navigation, Menu, UserMenu } from "./_ui";
import Logo from "@/assets/logo.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconHeart from "@/assets/icons/icon-heart.svg";
import IconCart from "@/assets/icons/icon-shopping-cart.svg";

export function AppBar() {
  const isLoggedIn = false; // 🔹 depois conectaremos com autenticação real

  return (
    <header
      className={twMerge(
        "w-full flex items-center justify-center transition-all duration-300 "
      )}
    >
      <InnerContainer className="flex flex-row items-center justify-between py-12">
        {/* Left: Logo */}
        <Link href="/" className="cursor-pointer">
          <Image src={Logo} alt="Logo" className="w-16" />
        </Link>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden lg:flex items-center mr-40 2xl:mr-96">
          <Navigation />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-6">
            <UserMenu
              isLoggedIn={isLoggedIn}
              onLogin={() => console.log("Login")}
              onLogout={() => console.log("Logout")}
            />
            <Image src={IconSearch} alt="icone buscar" className="w-[22px] h-[22px] cursor-pointer hover:text-gray-800" />
            <Image src={IconHeart} alt="icone favoritos" className="w-[22px] h-[22px] cursor-pointer hover:text-gray-800" />

            <div className="relative">
              <Image src={IconCart} alt="icone carrinho" className="w-[22px] h-[22px] cursor-pointer hover:text-gray-800" />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white font-medium text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>

          {/* Menu Hamburguer (somente mobile) */}
          <div className="flex lg:hidden">
            <Menu />
          </div>
        </div>
      </InnerContainer>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

import { InnerContainer } from "../ui";
import { Navigation, Menu, UserMenu } from "./_ui";
import Logo from "@/assets/logo.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconHeart from "@/assets/icons/icon-heart.svg";
import IconCart from "@/assets/icons/icon-shopping-cart.svg";
import { useUserProfileQuery } from "@/hooks/user";

import { useEffect, useState } from "react";

export function AppBar() {
  const { isLoading } = useUserProfileQuery();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <header className="w-full flex items-center justify-center transition-all duration-300">
      <InnerContainer className="flex flex-row items-center justify-between py-12">
        <Link href="/" className="cursor-pointer">
          <Image src={Logo} alt="Logo" className="w-16" />
        </Link>

        <div className="hidden lg:flex items-center mr-40 2xl:mr-96">
          <Navigation />
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-6">
            {isClient && !isLoading && (
              <UserMenu onLogin={handleLogin} />
            )}

            <Image
              src={IconSearch}
              alt="icone buscar"
              className="w-[22px] h-[22px] cursor-pointer hover:opacity-70"
            />
            <Link href="/favoritos">
              <Image
                src={IconHeart}
                alt="icone favoritos"
                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70"
              />
            </Link>
            <Link href="/carrinho" className="relative">
              <Image
                src={IconCart}
                alt="icone carrinho"
                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70"
              />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white font-medium text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-7 lg:hidden">
            <Link href="/favoritos">
              <Image
                src={IconHeart}
                alt="icone favoritos"
                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70"
              />
            </Link>
            <Link href="/carrinho" className="relative">
              <Image
                src={IconCart}
                alt="icone carrinho"
                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70"
              />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white font-medium text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
            <Menu />
          </div>
        </div>
      </InnerContainer>
    </header>
  );
}

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarData } from "@/constants/sidebar-admin-data";
import { NavAdmin } from "./_ui";

import { CardsThreeIcon, SignOutIcon } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove("token");
    queryClient.clear();
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" {...props} className="group">
      <SidebarHeader
        className="
          flex transition-all
          px-3 py-3
          group-data-[collapsible=icon]:px-0
          group-data-[collapsible=icon]:items-center
          group-data-[collapsible=icon]:justify-center"
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex items-center justify-center
              rounded-md bg-primary
              h-10 w-10 transition-all
              group-data-[collapsible=icon]:h-9
              group-data-[collapsible=icon]:w-9"
          >
            <CardsThreeIcon
              size={20}
              className="text-white transition-all group-data-[collapsible=icon]:scale-90"
            />
          </div>

          <div className="flex flex-col truncate transition-all group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-base leading-tight">SLNT</span>
            <span className="text-xs opacity-60 -mt-0.5">Empresa</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavAdmin items={SidebarData} />
      </SidebarContent>

      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="
              flex items-center gap-2
              px-4 py-2 mb-10 text-left text-sm cursor-pointer
              hover:bg-accent rounded-md
              transition-all
              group-data-[collapsible=icon]:justify-center
              group-data-[collapsible=icon]:px-0"
        >
          <SignOutIcon size={18} className="shrink-0 transition-all" />
          <span className="transition-all group-data-[collapsible=icon]:hidden">
            Sair
          </span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

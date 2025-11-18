"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import Link from "next/link";
import type { SidebarItem } from "@/constants/sidebar-admin-data";
import { useSidebar } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

export function NavAdmin({ items }: { items: SidebarItem[] }) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administração</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items;

          const parentActive =
            hasChildren && item.items?.some((sub) => pathname === sub.path);

          return (
            <Collapsible key={item.id} defaultOpen={parentActive}>
              <SidebarMenuItem>
                {hasChildren ? (
                  <CollapsibleTrigger asChild className="group/collapsible">
                    <SidebarMenuButton
                      className="cursor-pointer"
                      isActive={parentActive}
                      onClick={() => setOpen(true)}
                    >
                      <item.icon size={18} className="shrink-0" />
                      <span>{item.name}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 " />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.path || "")}
                  >
                    <Link href={item.path ?? "#"} onClick={() => setOpen(true)}>
                      <item.icon size={18} className="shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                )}

                {hasChildren && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => (
                        <SidebarMenuSubItem key={sub.path}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === sub.path}
                            className="text-muted-foreground data-[active=true]:text-foreground hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent"
                          >
                            <Link href={sub.path}>
                              <span className="text-xs mr-1">•</span>
                              <span>{sub.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACCOUNT_NAV_ITEMS } from "@/constants/items-account-navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full xl:w-72 bg-background border-[#F8F8F6] border-2 rounded-[10px] space-y-1">
      {ACCOUNT_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-[5px] text-xs transition-colors font-medium border-1  border-[#F8F8F6] my-3 mx-3",
              isActive
                ? "bg-muted font-medium"
                : "hover:bg-muted"
            )}
          >
            {item.label}
             <ChevronRight size={18} />
          </Link>
        );
      })}
    </aside>
  );
}

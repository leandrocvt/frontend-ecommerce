"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { itemsNavigation } from "@/constants";

interface NavigationProps {
  className?: string;
  onNavigate?: () => void;
}

export function Navigation({ className, onNavigate }: NavigationProps) {
  return (
    <nav className={twMerge("flex flex-col lg:flex-row gap-10 px-6 py-10 lg:py-0 lg:px-0", className)}>
      {itemsNavigation.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          onClick={onNavigate}
          className="text-sm hover:text-black/70 transition-all"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

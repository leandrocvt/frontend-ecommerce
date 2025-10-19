"use client";

import { useState } from "react";
import { Navigation } from "../_ui";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui";

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="cursor-pointer flex lg:hidden" />
      </SheetTrigger>

      <SheetContent className="flex lg:hidden px-0 text-black border-none">
        <SheetTitle />
        <Navigation
          className="items-start text-black hover:text-gray-700"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

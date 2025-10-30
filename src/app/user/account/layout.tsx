"use client";

import { AccountSidebar } from "@/components/account-sidebar";
import { InnerContainer } from "@/components/ui";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <InnerContainer className="container mx-auto flex flex-col lg:flex-row gap-6 py-8 ">
      <aside>
        <AccountSidebar />
      </aside>
      <section className="flex-1">{children}</section>
    </InnerContainer>
  );
}

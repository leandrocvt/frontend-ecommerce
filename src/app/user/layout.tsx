"use client";

import { AppBar } from "@/components/app-bar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      <main>
        {children}
      </main>
    </>
  );
}

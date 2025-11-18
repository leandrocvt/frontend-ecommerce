import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/sidebar-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      
      <AdminSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4 ">
          <SidebarTrigger className="cursor-pointer" />
        </header>

        <main className="flex flex-1 flex-col p-6">
          {children}
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}

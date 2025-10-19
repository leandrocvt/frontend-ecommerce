import { AppBar } from "@/components/app-bar";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header */}
      <AppBar />

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center">
        <div className="w-full h-[697px] bg-[#EDEDEF]"></div>
      </main>
    </div>
  );
}

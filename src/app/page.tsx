import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold text-center">Bem-vindo à Loja</h1>

      <Link
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
      >
        Ir para Login
      </Link>
    </div>
  );
}
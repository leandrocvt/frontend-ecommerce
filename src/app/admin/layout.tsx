export default async function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <main className="w-full flex items-center justify-center">
      <h1 className="text-xl font-semibold mb-4">Página do administrador</h1>
      {children}
    </main>
  );
}

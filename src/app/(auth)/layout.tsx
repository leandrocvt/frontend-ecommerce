export default async function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <main className="w-full flex items-center justify-center">{children}</main>
  );
}

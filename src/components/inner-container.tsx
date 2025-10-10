import { twMerge } from "tailwind-merge";

export function InnerContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={twMerge(
        `
        w-[85%] h-auto flex flex-col relative
    `,
        className
      )}
       style={{ border: "2px solid #98fa7a1f" }}
    >
      {children}
    </div>
  );
}

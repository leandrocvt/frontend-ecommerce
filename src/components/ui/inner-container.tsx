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
        w-[90%] lg:w-[85%] xl:w-[1026px] 2xl:w-[1500px] h-auto flex flex-col relative
    `,
        className
      )}
      // style={{ border: "2px solid #f883151f" }}
    >
      {children}
    </div>
  );
}

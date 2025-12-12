import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductItem } from "@/types/product";

interface ProductCardProps {
  product: ProductItem;
  variant?: "public" | "admin";
  onClick?: () => void;
}

export function ProductCard({
  product,
  variant = "public",
  onClick,
}: ProductCardProps) {
  const isAdmin = variant === "admin";

  const hasDiscount = product.finalPrice < product.basePrice;

  return (
    <div
      onClick={onClick}
      className="rounded-lg cursor-pointer relative w-full"
    >
      {hasDiscount && (
        <span className="absolute top-2 left-2 z-20 bg-[#B7080A] text-white text-[8px] font-semibold px-2 py-1 rounded">
          OFERTA
        </span>
      )}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md",
          isAdmin
            ? "h-[380px] sm:h-[320px] md:h-[360px] lg:h-[289px]"
            : "h-[380px] sm:h-[320px] md:h-[360px]"
        )}
      >
        <Image
          src={product.firstImageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex mt-5 justify-between">
        <h3 className="w-1/2 text-sm text-[#3E4B59] font-medium">
          {product.name}
        </h3>

        <div className="flex flex-col text-right">
          <p className="text-sm font-semibold">
            R$ {product.finalPrice.toFixed(2)}
          </p>

          {hasDiscount && (
            <p className="text-[#B5B9BE] font-semibold text-xs line-through">
              R$ {product.basePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

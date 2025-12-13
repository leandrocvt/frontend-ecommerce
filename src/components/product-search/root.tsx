"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Prefix, Root, SearchField } from "@/components/input/_ui";

interface ProductSearchProps {
  onSearch: (value?: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value.trim() || undefined);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <Root className="w-full sm:max-w-sm h-11">
      <Prefix>
        <Search size={16} className="text-neutral-400 mr-2" />
        <SearchField
          placeholder="Buscar produto..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Prefix>
    </Root>
  );
}

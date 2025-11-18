import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  HouseIcon,
  PackageIcon,
  TicketIcon,
  GearIcon,
  TShirtIcon,
  BoxArrowDownIcon
} from "@phosphor-icons/react";

export type SidebarSubItem = {
  name: string;
  path: string;
};

export type SidebarItem = {
  id: string;
  name: string;
  icon: PhosphorIcon;
  path?: string;
  items?: SidebarSubItem[];
};

export const SidebarData: SidebarItem[] = [
  { id: "home", name: "Home", icon: HouseIcon, path: "/admin/dashboard" },

  {
    id: "products",
    name: "Produtos",
    icon: TShirtIcon,
    items: [
      { name: "Todos os produtos", path: "/admin/products" },
      { name: "Adicionar produto", path: "/admin/products/new" },
      { name: "Editar produto", path: "/admin/products/edit" },
    ],
  },

  {
    id: "orders",
    name: "Pedidos",
    icon: PackageIcon,
    items: [{ name: "Gerenciar pedidos", path: "/admin/orders" }],
  },

  {
    id: "coupons",
    name: "Cupons",
    icon: TicketIcon,
    items: [{ name: "Gerenciar cupons", path: "/admin/coupons" }],
  },

  {
    id: "returns",
    name: "Devoluções",
    icon: BoxArrowDownIcon,
    items: [{ name: "Gerenciar devoluções", path: "/admin/returns" }],
  },

  {
    id: "config",
    name: "Configurações",
    icon: GearIcon,
    path: "/user/account",
  },
];

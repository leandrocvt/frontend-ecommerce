// Navegação principal (desktop)
export const itemsNavigation = [
  { id: 1, name: "Início", path: "/" },
  { id: 2, name: "Comprar", path: "/comprar" },
  { id: 3, name: "Coleções", path: "/colecoes" },
  { id: 4, name: "Contato", path: "/contato" },
];

// Navegação do menu mobile (hambúrguer)
export const itemsMobileMenu = [
  {
    id: "auth",
    label: "Entre ou cadastre-se",
    path: "/login",
    icon: "UserCircle",
    section: "auth",
  },
  {
    id: "main",
    section: "main",
    items: [
      { label: "Início", path: "/", icon: "ChevronRight" },
      { label: "Comprar", path: "/comprar", icon: "ChevronRight" },
      { label: "Coleções", path: "/colecoes", icon: "ChevronRight" },
      { label: "Contato", path: "/contato", icon: "ChevronRight" },
    ],
  },
  {
    id: "support",
    section: "support",
    items: [
      { label: "Acompanhe seu pedido", path: "/pedidos", icon: "Package" },
      { label: "Acessibilidade", path: "/acessibilidade", icon: "Settings" },
      { label: "Ajuda", path: "/ajuda", icon: "HelpCircle" },
    ],
  },
];

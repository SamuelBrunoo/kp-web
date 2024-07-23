import icons from "../../assets/icons"

export const menu = [
  { title: "Início", icon: icons.home, slug: "dash", link: "/dashboard" },
  {
    title: "Produtos",
    icon: icons.prods,
    slug: "products",
    link: "/dashboard/products",
  },
  {
    title: "Clientes",
    icon: icons.clients,
    slug: "clients",
    link: "/dashboard/clients",
  },
  {
    title: "Pedidos",
    icon: icons.orders,
    slug: "orders",
    link: "/dashboard/orders",
  },
  {
    title: "Montagem",
    icon: icons.delegate,
    slug: "manufacturing",
    link: "/dashboard/manufacturing",
  },
]

import Icons from "../../assets/icons"
import { TSideMenuItem } from "../@types/components/sidemenu"

export const menu: TSideMenuItem[] = [
  {
    title: "Início",
    icon: Icons.Home,
    slug: "dash",
    link: "/dashboard",
    submenus: [],
  },
  {
    title: "Modelos",
    icon: Icons.Prods,
    slug: "models",
    link: "/dashboard/models",
    submenus: [],
  },
  {
    title: "Produtos",
    icon: Icons.Prods,
    slug: "products",
    link: "/dashboard/products",
    submenus: [],
  },
  {
    title: "Clientes",
    icon: Icons.Clients,
    slug: "clients",
    link: "/dashboard/clients",
    submenus: [],
  },
  {
    title: "Representantes",
    icon: Icons.Delegate,
    slug: "representatives",
    link: "/dashboard/representatives",
    submenus: [],
  },
  {
    title: "Pedidos",
    icon: Icons.Orders,
    slug: "orders",
    link: "/dashboard/orders",
    submenus: [],
  },
  {
    title: "Montagem",
    icon: Icons.Orders,
    slug: "production",
    link: "/dashboard/production",
    submenus: [],
  },
]

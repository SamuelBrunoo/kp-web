import Icons from "../../assets/icons"
import { TSideMenuItem } from "../@types/components/sidemenu"

export const menu: TSideMenuItem[] = [
  {
    title: "Início",
    icon: Icons.home,
    slug: "dash",
    link: "/dashboard",
    submenus: [],
  },
  {
    title: "Modelos",
    icon: Icons.prods,
    slug: "models",
    link: "/dashboard/models",
    submenus: [],
  },
  {
    title: "Produtos",
    icon: Icons.prods,
    slug: "products",
    link: "/dashboard/products",
    submenus: [],
  },
  {
    title: "Clientes",
    icon: Icons.clients,
    slug: "clients",
    link: "/dashboard/clients",
    submenus: [],
  },
  {
    title: "Representantes",
    icon: Icons.delegate,
    slug: "delegates",
    link: "/dashboard/delegates",
    submenus: [],
  },
  {
    title: "Pedidos",
    icon: Icons.orders,
    slug: "orders",
    link: "/dashboard/orders",
    submenus: [],
  },
  {
    title: "Montagem",
    icon: Icons.orders,
    slug: "production",
    link: "/dashboard/production",
    submenus: [],
  },
]

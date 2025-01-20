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
    link: "/models",
    submenus: [],
  },
  {
    title: "Produtos",
    icon: Icons.prods,
    slug: "products",
    link: "/products",
    submenus: [],
  },
  {
    title: "Clientes",
    icon: Icons.clients,
    slug: "clients",
    link: "/clients",
    submenus: [],
  },
  {
    title: "Representantes",
    icon: Icons.delegate,
    slug: "delegates",
    link: "/delegates",
    submenus: [],
  },
  {
    title: "Pedidos",
    icon: Icons.orders,
    slug: "orders",
    link: "/orders",
    submenus: [],
  },
  {
    title: "Montagem",
    icon: Icons.orders,
    slug: "production",
    link: "/production",
    submenus: [],
  },
]

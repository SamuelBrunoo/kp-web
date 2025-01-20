export type TSideMenuItem = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  slug: string
  link: string
  submenus: TSubmenuItem[]
}

export type TSubmenuItem = {
  slug: string
  title: string
  link: string
}

import * as S from "./styles"
import { menu } from "../../utils/sys/menu"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import SideMenuItem from "../SidemenuItem"
import getStore from "../../store"

const Aside = () => {
  const { user } = getStore()

  const location = useLocation()
  const [page, setPage] = useState("")

  useEffect(() => {
    const splitted = location.pathname.split("/dashboard")[1].split("/", 10)
    const val = splitted[1] ?? "dash"

    setPage(val)
  }, [location.pathname])

  return (
    <S.Component>
      <S.Container>
        <S.MainContent>
          <S.UserArea>
            <S.UserData>
              <S.UserName>{user?.name}</S.UserName>
              <S.UserEmail>{user?.email}</S.UserEmail>
            </S.UserData>
          </S.UserArea>
          <S.MenuArea>
            {menu.map((item, k) => (
              <SideMenuItem
                key={k}
                menuInfo={item}
                active={page.includes(item.slug)}
              />
            ))}
          </S.MenuArea>
        </S.MainContent>
      </S.Container>
    </S.Component>
  )
}

export default Aside

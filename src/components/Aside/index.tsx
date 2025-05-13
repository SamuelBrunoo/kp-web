import * as S from "./styles"
import { menu } from "../../utils/sys/menu"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import SideMenuItem from "../SidemenuItem"
import getStore from "../../store"
import Icons from "../../assets/icons"

const Aside = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { user } = getStore()

  const location = useLocation()
  const [page, setPage] = useState("")

  const [sideOpened, setSideOpened] = useState(false)

  const toggleSideMenu = () => {
    if (window.document.body.clientWidth <= 520) {
      window.document.body.style.overflow = !sideOpened ? "hidden" : "unset"

      setSideOpened(!sideOpened)
    }
  }

  useEffect(() => {
    const collapseOwnDropdown = () => {
      setSideOpened(false)
    }

    const handleClickOutside = (e: any) => {
      if (e.target !== document.children[0]) {
        if (!wrapperRef.current?.contains(e.target) && sideOpened)
          collapseOwnDropdown()
      }
    }

    if (sideOpened) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [wrapperRef, sideOpened])

  useEffect(() => {
    const splitted = location.pathname.split("/dashboard")[1].split("/", 10)
    const val = splitted[1] ?? "dash"

    setPage(val)
  }, [location.pathname])

  return (
    <S.Component $opened={sideOpened}>
      <S.Container>
        <S.BurguerWrapper $opened={sideOpened} onClick={toggleSideMenu}>
          <Icons.Burguer />
        </S.BurguerWrapper>
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

import * as S from "./styles"
import { menu } from "../../utils/sys/menu"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const Aside = () => {
  const location = useLocation()
  const [page, setPage] = useState("")

  useEffect(() => {
    const splitted = location.pathname.split("/dashboard")
    const val = splitted.length > 1 ? splitted[1].slice(1) : location.pathname

    setPage(!!val ? val : "dash")
  }, [location.pathname])

  return (
    <S.Component>
      <S.Container>
        <S.MainContent>
          <S.UserArea>
            <S.UserProfile />
            <S.UserData>
              <S.UserName>Keila linda</S.UserName>
              <S.UserEmail>keeilacooelho@hotmail.com</S.UserEmail>
            </S.UserData>
          </S.UserArea>
          <S.MenuArea>
            {menu.map((item, k) => (
              <S.MenuItem
                key={k}
                className={item.slug === page ? "active" : ""}
              >
                <Link to={item.link}>
                  {item.icon}
                  <S.MenuTitle>{item.title}</S.MenuTitle>
                </Link>
              </S.MenuItem>
            ))}
          </S.MenuArea>
        </S.MainContent>
      </S.Container>
    </S.Component>
  )
}

export default Aside

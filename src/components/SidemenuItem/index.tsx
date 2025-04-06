import * as S from "./styles"
import { TSideMenuItem } from "../../utils/@types/components/sidemenu"
import { Link } from "react-router-dom"

type Props = {
  active: boolean
  menuInfo: TSideMenuItem
}

const SideMenuItem = ({ menuInfo, active }: Props) => {
  return (
    <S.Component>
      <S.MainContent $active={active}>
        {menuInfo.submenus.length === 0 ? (
          <Link to={menuInfo.link}>
            <S.MainInfo>
              <menuInfo.icon />
              <S.MainTitle>{menuInfo.title}</S.MainTitle>
            </S.MainInfo>
          </Link>
        ) : (
          <S.MainInfo>
            <menuInfo.icon />
            <S.MainTitle>{menuInfo.title}</S.MainTitle>
          </S.MainInfo>
        )}
      </S.MainContent>
    </S.Component>
  )
}

export default SideMenuItem

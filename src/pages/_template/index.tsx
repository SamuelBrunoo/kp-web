import { Outlet } from "react-router-dom"
import * as S from "./styles"
import Aside from "../../component/Aside"

const Template = () => {
  return (
    <S.Page>
      <Aside />
      <S.Wrapper>
        <S.Container>
          <Outlet />
        </S.Container>
      </S.Wrapper>
    </S.Page>
  )
}

export default Template

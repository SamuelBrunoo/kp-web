import * as S from "./styles"
import icons from "../../assets/icons"

type Props = {
  title: string
  subtitle?: string
  search?: string
  onChangeSearch?: (v: string) => void
  buttons?: TButton[]
}

type TButton = {
  role: "new" | "update" | "cancel"
  text: string
  onClick: (p?: any) => void | any
}

const PageHead = ({
  title,
  subtitle,
  search,
  onChangeSearch,
  buttons,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Main>
        {search !== undefined && onChangeSearch !== undefined && (
          <S.SearchArea>
            {icons.search}
            <S.SearchInput
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
            />
          </S.SearchArea>
        )}
        {subtitle !== undefined && <S.SubTitle>{subtitle}</S.SubTitle>}
        {buttons &&
          buttons.map((btn, k) => (
            <S.Button key={k} $role={btn.role} onClick={btn.onClick}>
              {btn.role === "new"
                ? icons.add
                : btn.role === "update"
                ? icons.check
                : btn.role === "cancel"
                ? icons.cancel
                : null}
              <span>{btn.text}</span>
            </S.Button>
          ))}
      </S.Main>
    </S.Wrapper>
  )
}

export default PageHead

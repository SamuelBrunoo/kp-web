/* eslint-disable react/jsx-pascal-case */
import * as S from "./styles"
import Input from "../Inpts"
import { TRoOption } from "../../utils/@types/sys/roOptions"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import Icons from "../../assets/icons"

type Props = {
  title: string
  subtitle?: string
  search?: string
  onChangeSearch?: (v: string) => void
  onFilterChange?: (filter: string, v: string) => void
  filters?: TFilter[]
  buttons?: TButton[]
  forForm?: boolean
}

export type TFilter = {
  name: string
  label: string
  value: any
  options: TRoOption[]
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
  onFilterChange,
  onChangeSearch,
  filters,
  buttons,
  forForm,
}: Props) => {
  const navigate = useNavigate()

  const handleFilter = (filterKey: string, value: string) => {
    onFilterChange && onFilterChange(filterKey, value)
  }

  const handleCreate = () => {
    navigate("single")
  }

  const handleSearch = () => {
    // ...
  }

  return (
    <S.Wrapper>
      <S.HeaderTop>
        <S.HeaderTopLeft>
          <S.Title>{title}</S.Title>
          {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
        </S.HeaderTopLeft>

        <Button
          color="green"
          type="secondary"
          text="Novo"
          action={handleCreate}
          role="new"
          startIcon={<Icons.Add />}
        />
      </S.HeaderTop>
      {!forForm && (
        <S.Main>
          <S.SearchArea>
            {search !== undefined && onChangeSearch !== undefined && (
              <Input.PageSearch
                placeholder="Pesquisar..."
                value={search}
                onChange={onChangeSearch}
              />
            )}
            {filters &&
              filters.map((filter, k) => (
                <Input.PageSearchSelect
                  key={k}
                  onChange={(v) => handleFilter(filter.name, v)}
                  roOptions={filter.options}
                  value={filter.value}
                  label={filter.label}
                />
              ))}
          </S.SearchArea>

          <Button
            action={handleSearch}
            color="green"
            text="Buscar"
            type="primary"
          />
        </S.Main>
      )}
    </S.Wrapper>
  )
}

export default PageHead

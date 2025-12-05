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
  searchPlaceholder?: string
  onChangeSearch?: (v: string) => void
  onFilterChange?: (filter: string, v: string) => void
  filters?: TFilter[]
  withoutNewButton?: boolean
  buttons?: TButton[]
  forForm?: boolean
  showSearchButton?: boolean

  /* Tabs Control */
  tabs?: TTab[]
  onChangeTab?: (newTab: string) => void
  tab?: string
  onSearch?: () => Promise<void>
}

export type TTab = {
  key: string
  name: string
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
  searchPlaceholder = "Pesquisar...",
  onFilterChange,
  onChangeSearch,
  filters,
  withoutNewButton,
  forForm,
  tabs,
  onChangeTab,
  tab,
  showSearchButton = true,
  onSearch,
}: Props) => {
  const navigate = useNavigate()

  const handleFilter = (filterKey: string, value: string) => {
    onFilterChange && onFilterChange(filterKey, value)
  }

  const handleCreate = () => {
    navigate("single")
  }

  const handleSearch = () => {
    if (onSearch) onSearch()
  }

  const handleTab = (newTab: string) => {
    if (onChangeTab) onChangeTab(newTab)
  }

  return (
    <S.Wrapper>
      <S.HeaderTop>
        <S.HeaderTopLeft>
          <S.Title>{title}</S.Title>
          {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
        </S.HeaderTopLeft>

        {!withoutNewButton && (
          <Button
            color="green"
            type="secondary"
            text="Novo"
            action={handleCreate}
            role="new"
            startIcon={<Icons.Add />}
          />
        )}
      </S.HeaderTop>

      {tabs && (
        <S.TabsArea>
          {tabs.map((t, tKey) => (
            <S.Tab key={tKey} $active={tab === t.key}>
              <S.TabName onClick={() => handleTab(t.key)}>{t.name}</S.TabName>
            </S.Tab>
          ))}
        </S.TabsArea>
      )}

      {!forForm && (
        <S.Main>
          <S.SearchArea>
            {search !== undefined && onChangeSearch !== undefined && (
              <Input.PageSearch
                placeholder={searchPlaceholder}
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

          {showSearchButton && (
            <Button
              action={handleSearch}
              color="green"
              text="Buscar"
              type="primary"
            />
          )}
        </S.Main>
      )}
    </S.Wrapper>
  )
}

export default PageHead

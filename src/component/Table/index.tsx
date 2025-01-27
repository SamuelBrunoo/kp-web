import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import { useState } from "react"

type Props = {
  config: TConfig
  data: any[]
  actions?: {
    [key: string]: (...props: any[]) => void | any
  }
  noHover?: boolean
  search?: string
  searchFields?: string[]
  expandComponent?: (item: any) => JSX.Element
}

const Table = ({
  config,
  data,
  noHover,
  actions,
  search,
  searchFields,
  expandComponent,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.RowItem>
            {config.columns.map((col, k) => (
              <S.TCol
                key={k}
                $size={col.size}
                $align={col.align}
                $width={col.width}
              >
                {col.title}
              </S.TCol>
            ))}
          </S.RowItem>
        </S.TableHead>
        <S.TableBody $noHover={noHover}>
          {data
            .filter((item) => {
              let ok = false

              if (!!search) {
                searchFields?.forEach((sf) => {
                  if (!ok) {
                    const v = sf.includes(".")
                      ? item[sf.split(".")[0]][sf.split(".")[1]]
                      : item[sf]

                    ok = String(v).toLowerCase().includes(search.toLowerCase())
                  }
                })
              } else ok = true

              return ok
            })
            .map((item, k) => (
              <RowItem
                key={k}
                item={item}
                config={config}
                actions={actions}
                expandComponent={expandComponent}
                noHover={noHover}
              />
            ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}

type TRowItemProps = {
  item: any
  config: TConfig
  actions: Props["actions"]
  expandComponent?: any
  noHover?: boolean
}

const RowItem = (props: TRowItemProps) => {
  const { item, config, actions, expandComponent, noHover } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <>
      <S.RowItem className={isExpanded ? "highlighted" : ""} $noHover={noHover}>
        {config.columns.map((col, k) => {
          let content: any = null

          const field = config.specialFields[col.field]

          content = field
            ? field(item, {
                data: {
                  size: col.size as number,
                },
                callbacks: { ...actions },
              })
            : item[col.field]

          return (
            <S.ItemData
              key={k}
              $hasPointer={expandComponent && k !== config.columns.length - 1}
              $align={col.align}
              $width={col.width}
              onClick={
                expandComponent && k !== config.columns.length - 1
                  ? toggleExpand
                  : undefined
              }
            >
              {content}
            </S.ItemData>
          )
        })}
      </S.RowItem>
      {config.isExpandable && expandComponent && (
        <S.RowExpandable className={isExpanded ? "highlighted noBg" : "noBg"}>
          <S.REWrapper colSpan={6}>
            <S.REBox $visible={isExpanded}>
              <S.REContainer>{expandComponent(item)}</S.REContainer>
            </S.REBox>
          </S.REWrapper>
        </S.RowExpandable>
      )}
    </>
  )
}

export default Table

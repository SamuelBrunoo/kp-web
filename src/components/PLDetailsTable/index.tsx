import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import { useState } from "react"
import { TPageListProductionLine } from "../../utils/@types/data/productionLine"
import Icons from "../../assets/icons"
import { theme } from "../../theme"

type Props = {
  config: TConfig
  data: TPageListProductionLine["order"]["details"]["products"]
  actions?: any[]
  noHover?: boolean
  expandComponent?: (item: any) => JSX.Element
}

const ProductionLineDetailsTable = ({
  config,
  data,
  actions,
  noHover,
  expandComponent,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.RowItem className="normal noHover">
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
          {data.map((item, k) => (
            <RowItem
              key={k}
              item={item}
              config={config}
              actions={actions}
              expandComponent={expandComponent}
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
  actions: any
  expandComponent?: any
}

const RowItem = (props: TRowItemProps) => {
  const { item, config, actions, expandComponent } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <>
      <S.RowItem className={"normal"}>
        {config.columns.map((col, k) => {
          let content: any = null

          content = config.specialFields[col.field]
            ? config.specialFields[col.field](item, {
                callbacks: actions,
              })
            : item[col.field]

          return (
            <S.ItemData
              key={k}
              $hasPointer={
                !config.isDropable &&
                expandComponent &&
                k !== config.columns.length - 1
              }
              $align={col.align}
              $width={col.width}
              onClick={
                !config.isDropable &&
                expandComponent &&
                k !== config.columns.length - 1
                  ? toggleExpand
                  : undefined
              }
            >
              {content}
            </S.ItemData>
          )
        })}

        {config.isDropable && (
          <S.ItemData
            key={config.columns.length}
            $hasPointer={true}
            $align={"right"}
            $width={"64px"}
            onClick={config.isDropable ? toggleExpand : undefined}
          >
            <Icons.Dropdown
              style={{
                color: theme.colors.green[460],
                transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                transition: "transform 0.3s",
              }}
            />
          </S.ItemData>
        )}
      </S.RowItem>
      {config.isExpandable && expandComponent && (
        <S.RowExpandable className={"normal noHover"}>
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

export default ProductionLineDetailsTable

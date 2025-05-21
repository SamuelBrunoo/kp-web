import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import { useState } from "react"
import { formatMoney } from "../../utils/helpers/formatters/money"
import { theme } from "../../theme"

type Props = {
  config: TConfig
  data: any[]
  actions?: any[]
  noHover?: boolean
  expandComponent?: (item: any) => JSX.Element
  totals: {
    products: number
    value: number
  }
}

const OrderDetailsTable = ({
  config,
  data,
  actions,
  totals,
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
                $hideOnMobile={col.hideOn?.includes("small")}
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

          {/* Total */}

          <S.RowItem className={"normal totals noHover"}>
            <S.ResumeProductsData
              colSpan={
                config.columns.some(
                  (i) =>
                    i.field === "statusIndicator" ||
                    window.document.body.clientWidth >= theme.bp.small
                )
                  ? 3
                  : 2
              }
              $align={"left"}
            >
              Total
            </S.ResumeProductsData>
            <S.ResumeProductsData $align={"center"}>
              {totals.products}
            </S.ResumeProductsData>
            <S.ResumeProductsData />
            <S.ResumeProductsData $hideOnMobile={true}>
              {formatMoney(totals.value)}
            </S.ResumeProductsData>
          </S.RowItem>
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

  const [isExpanded] = useState(true)

  const toggleExpand = () => {} // setIsExpanded(!isExpanded)

  return (
    <>
      <S.RowItem className={"normal noHover"}>
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
              $hasPointer={expandComponent && k !== config.columns.length - 1}
              $align={col.align}
              $width={col.width}
              $hideOnMobile={col.hideOn?.includes("small")}
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

export default OrderDetailsTable

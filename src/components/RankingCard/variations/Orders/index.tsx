import { formatDate } from "date-fns"
import { formatMoney } from "../../../../utils/helpers/formatters/money"
import * as S from "../../styles"

export type POrdersVariation = {
  title: string
  data: {
    id: number
    clientName: string
    value: number
    orderDate: string | number
    itemsCount: number
  }[]
}

const ListVariation = ({ title, data }: POrdersVariation) => {
  return (
    <S.Box>
      <S.CardTitle>{title}</S.CardTitle>
      <S.MainInfo>
        <S.List>
          {data.map((i, k) => (
            <ListItem key={k} data={i} />
          ))}
        </S.List>
      </S.MainInfo>
    </S.Box>
  )
}

const ListItem = ({ data }: { data: POrdersVariation["data"][number] }) => {
  return (
    <S.ListItem>
      <S.Info $role="id">#{String(data.id).padStart(2, "0")}</S.Info>
      <S.InfoArea $fill={true} $align="left">
        <S.OrderInfo $role="primary">{data.clientName}</S.OrderInfo>
        <S.OrderInfo $role="tertiary">
          {formatDate(new Date(data.orderDate), "dd/MM/yyyy")}
        </S.OrderInfo>
      </S.InfoArea>
      <S.InfoArea $fill={true} $align="right">
        <S.OrderInfo $role="secondary">{formatMoney(data.value)}</S.OrderInfo>
        <S.OrderInfo $role="tertiary">{data.itemsCount} itens</S.OrderInfo>
      </S.InfoArea>
    </S.ListItem>
  )
}

export default ListVariation

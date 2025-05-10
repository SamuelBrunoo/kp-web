import { POrdersVariation } from "../../../components/RankingCard/variations/Orders"
import { TOrder } from "../../@types/data/order"

export const parseOrderToDashboardList = (
  order: TOrder
): POrdersVariation["data"][number] => {
  const info: POrdersVariation["data"][number] = {
    id: +order.code,
    clientName: order.client.clientName,
    value: order.value,
    orderDate: order.orderDate,
    itemsCount: order.totals.products,
  }

  return info
}

export const parseOrdersToDashboardList = (
  orders: TOrder[]
): POrdersVariation["data"] => {
  let list: POrdersVariation["data"] = []

  for (const order of orders) {
    const info: POrdersVariation["data"][number] =
      parseOrderToDashboardList(order)

    list.push(info)
  }

  return list
}

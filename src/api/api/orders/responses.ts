import { TDefaultRes } from "../../types/responses"
import { TOrder, TPageListOrder } from "../../../utils/@types/data/order"
import { TStatisticsOrder } from "../../../utils/@types/data/statistics/orders"

export type TApi_Responses_Orders = {
  orders: {
    createOrder: Promise<TDefaultRes<TOrder>>
    updateOrder: Promise<TDefaultRes<TOrder>>
    shipOrder: Promise<TDefaultRes<{ shipDate: number }>>
    getPageListOrders: Promise<
      TDefaultRes<{
        list: TPageListOrder[]
        statistics: TStatisticsOrder
      }>
    >
    getOrders: Promise<
      TDefaultRes<{
        list: TOrder[]
      }>
    >
    getOrder: Promise<
      TDefaultRes<{
        order: TOrder
      }>
    >
    deleteOrder: Promise<TDefaultRes<{}>>
    formBare: Promise<
      TDefaultRes<{
        emmitters: any[]
        clients: any[]
        products: any[]
        prodTypes: any[]
        models: any[]
        colors: any[]
        representatives: any[]
      }>
    >
  }
}

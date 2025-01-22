import { TNewOrder, TOrder } from "../../../utils/@types/data/order"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_Orders = {
  orders: {
    createOrder: { newOrder: TNewOrder }
    updateOrder: { order: TOrder }
    getPageListOrders: TDefaultFilters
    getOrders: {}
    getOrder: { id: string }
    deleteOrder: { id: string }
    formBare: {}
  }
}

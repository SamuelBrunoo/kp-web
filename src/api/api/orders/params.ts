import { TNewOrder, TOrder } from "../../../utils/@types/data/order"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_Orders = {
  orders: {
    createOrder: { newOrder: TNewOrder }
    updateOrder: { order: TOrder }
    getPageListOrders: TDefaultFilters & {
      shippingStatus?: string
    }
    getOrders: {}
    getOrder: { id: string }
    deleteOrder: { id: string }
    formBare: {}
  }
}

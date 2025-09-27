import { TOrderStatus } from "../../order"

export type TStatisticsOrder = {
  totalOrders: number
  amountByStatus: {
    [key in TOrderStatus]: number
  }
  totalAmount: number
}

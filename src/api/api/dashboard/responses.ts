import { TDefaultRes } from "../../types/responses"
import { TOrder } from "../../../utils/@types/data/order"
import { PListVariation } from "../../../components/RankingCard/variations/List"

export type TApi_Responses_Dashboard = {
  dashboard: {
    admin: Promise<
      TDefaultRes<{
        monthlySells: {
          current: number
          last: number
          past: number
        }
        totalSells: {
          balance: number
          sells: number
          spends: number
        }
        bastSellers: PListVariation["data"]
        orders: {
          shippedToday: TOrder[]
          production: TOrder[]
          lastOrders: TOrder[]
        }
      }>
    >
  }
}

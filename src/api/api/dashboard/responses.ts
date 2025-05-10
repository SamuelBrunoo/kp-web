import { TDefaultRes } from "../../types/responses"
import { TOrder } from "../../../utils/@types/data/order"
import { PListVariation } from "../../../components/RankingCard/variations/List"
import { TComponents } from "../../../utils/@types/components"

export type TApi_Responses_Dashboard = {
  dashboard: {
    admin: Promise<
      TDefaultRes<{
        monthlySells: TComponents["cards"]["dashboard"]["monthlySells"]
        totalSells: TComponents["cards"]["dashboard"]["totalSells"]
        bastSellers: PListVariation["data"]
        orders: {
          shippedToday: TOrder[]
          waitingToShip: TOrder[]
          production: TOrder[]
          lastOrders: TOrder[]
        }
      }>
    >
  }
}

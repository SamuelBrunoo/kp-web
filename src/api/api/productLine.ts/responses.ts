import { TDefaultRes } from "../../types/responses"
import { TProductionLine } from "../../../utils/@types/data/productionLine"

export type TApi_Responses_ProductionLines = {
  productionLines: {
    getProductionLines: Promise<
      TDefaultRes<{
        list: TProductionLine[]
      }>
    >
    getProductionLine: Promise<TDefaultRes<TProductionLine>>
  }
}

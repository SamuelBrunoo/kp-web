import { TDefaultRes } from "../../types/responses"
import {
  TPageListProductionLine,
  TProductionLine,
} from "../../../utils/@types/data/productionLine"

export type TApi_Responses_ProductionLines = {
  productionLines: {
    getProductionLinesPageList: Promise<
      TDefaultRes<{
        list:
          | TPageListProductionLine["order"][]
          | TPageListProductionLine["products"][]
      }>
    >
    getProductionLines: Promise<
      TDefaultRes<{
        list: TProductionLine[]
      }>
    >
    getProductionLine: Promise<TDefaultRes<TProductionLine>>
  }
}

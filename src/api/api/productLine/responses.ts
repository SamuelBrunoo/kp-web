import { TDefaultRes } from "../../types/responses"
import {
  TPageListProductionLine,
  TProductionLine,
} from "../../../utils/@types/data/productionLine"
import { TWorker } from "../../../utils/@types/data/worker"

export type TApi_Responses_ProductionLines = {
  productionLines: {
    getProductionLinesPageList: Promise<
      TDefaultRes<{
        list:
          | TPageListProductionLine["order"][]
          | TPageListProductionLine["products"][]
        workers: TWorker[]
      }>
    >
    getProductionLines: Promise<
      TDefaultRes<{
        list: TProductionLine[]
      }>
    >
    getProductionLine: Promise<TDefaultRes<TProductionLine>>
    updateProductionLine: Promise<TDefaultRes<TProductionLine>>
  }
}

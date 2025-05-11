import {
  TAttribution,
  TNewProductionLine,
} from "../../../utils/@types/data/productionLine"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_ProductionLines = {
  productionLines: {
    createProductionLine: { newProductionLine: TNewProductionLine }
    updateProductionLine: {
      id: string
      products: TAttribution[]
    }
    getProductionLinesPageList: { showType: "orders" | "products" }
    getProductionLines: TDefaultFilters
    getProductionLine: { id: string }
    deleteProductionLine: { id: string }
  }
}

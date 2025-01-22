import {
  TNewProductionLine,
  TProductionLine,
} from "../../../utils/@types/data/productionLine"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_ProductionLines = {
  productionLines: {
    createProductionLine: { newProductionLine: TNewProductionLine }
    updateProductionLine: { productionLine: TProductionLine }
    getProductionLines: TDefaultFilters
    getProductionLine: { id: string }
    deleteProductionLine: { id: string }
  }
}

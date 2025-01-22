import { TDefaultRes } from "../../types/responses"
import { TProductType } from "../../../utils/@types/data/productType"

export type TApi_Responses_ProductTypes = {
  productTypes: {
    getProductTypes: Promise<
      TDefaultRes<{
        list: TProductType[]
      }>
    >
    getProductType: Promise<TDefaultRes<TProductType>>
  }
}

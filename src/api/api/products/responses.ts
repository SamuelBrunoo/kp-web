import { TDefaultRes } from "../../types/responses"
import {
  TNewProduct,
  TPageListProduct,
  TProduct,
} from "../../../utils/@types/data/product"
import { TProductType } from "../../../utils/@types/data/productType"
import { TModel } from "../../../utils/@types/data/model"
import { TColor } from "../../../utils/@types/data/color"

export type TApi_Responses_Products = {
  products: {
    createProduct: Promise<TDefaultRes<TNewProduct>>
    updateProduct: Promise<TDefaultRes<TProduct>>
    getProducts: Promise<TDefaultRes<TProduct[]>>
    getProduct: Promise<TDefaultRes<TProduct>>
    getProductsPageList: Promise<
      TDefaultRes<{
        list: TPageListProduct[]
      }>
    >
    deleteProduct: Promise<TDefaultRes<{}>>
    formBare: Promise<
      TDefaultRes<{
        prodTypes: TProductType[]
        models: TModel[]
        colors: TColor[]
      }>
    >
  }
}

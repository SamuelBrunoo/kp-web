import { TNewProduct, TProduct } from "../../../utils/@types/data/product"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_Products = {
  products: {
    createProduct: { newProduct: TNewProduct }
    updateProduct: { product: TProduct }
    getProductsPageList: TDefaultFilters
    getProducts: {}
    getProduct: { id: string }
    deleteProduct: { id: string }
    formBare: {}
  }
}

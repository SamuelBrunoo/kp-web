import { TNewProduct, TProduct } from "../data/product"
import { TModel, TNewModel } from "../data/model"

export type TParams = {
  new: {
    product: TNewProduct
    model: TNewModel
  }
  update: {
    product: TProduct
    model: TModel
  }
  get: {
    colors: {}
    products: {}
    product: { id: string }
    productTypes: {}
    models: {}
    model: { id: string }
  }
  delete: {
    product: { id: string }
    model: { id: string }
  }
  pageInfo: {
    productForm: {}
    models: {}
  }
}

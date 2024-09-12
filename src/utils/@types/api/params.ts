import { TNewProduct, TProduct } from "../data/product"
import { TModel, TNewModel } from "../data/model"
import { TClient, TNewClient } from "../data/client"

export type TParams = {
  new: {
    product: TNewProduct
    model: TNewModel
    client: TNewClient
  }
  update: {
    product: TProduct
    model: TModel
    client: TClient
  }
  get: {
    colors: {}
    productTypes: {}

    products: {}
    product: { id: string }

    models: {}
    model: { id: string }

    clients: {}
    client: { id: string }
  }
  delete: {
    product: { id: string }
    model: { id: string }
    client: { id: string }
  }
  pageInfo: {
    productForm: {}
    models: {}
  }
}

import { TNewProduct, TProduct } from "../data/product"
import { TModel, TNewModel } from "../data/model"
import { TClient, TNewClient } from "../data/client"
import { TNewRepresentative, TRepresentative } from "../data/representative"

export type TParams = {
  new: {
    product: TNewProduct
    model: TNewModel
    client: TNewClient
    representative: TNewRepresentative
  }
  update: {
    product: TProduct
    model: TModel
    client: TClient
    representative: TRepresentative
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

    representatives: {}
    representative: { id: string }
  }
  delete: {
    product: { id: string }
    model: { id: string }
    client: { id: string }
    representative: { id: string }
  }
  pageInfo: {
    productForm: {}
    models: {}
  }
}

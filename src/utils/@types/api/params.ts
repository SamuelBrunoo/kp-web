import { TNewProduct, TProduct } from "../data/product"
import { TModel, TNewModel } from "../data/model"
import { TClient, TNewClient } from "../data/client"
import { TNewRepresentative, TRepresentative } from "../data/representative"
import { TNewOrder, TOrder } from "../data/order"

export type TParams = {
  new: {
    product: TNewProduct
    model: TNewModel
    client: TNewClient
    representative: TNewRepresentative
    order: TNewOrder
  }
  update: {
    product: TProduct
    model: TModel
    client: TClient
    representative: TRepresentative
    order: TOrder
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

    orders: {}
    order: { id: string }
  }
  delete: {
    product: { id: string }
    model: { id: string }
    client: { id: string }
    representative: { id: string }
    order: { id: string }
  }
  pageInfo: {
    orderForm: {}
    productForm: {}
    models: {}
  }
}

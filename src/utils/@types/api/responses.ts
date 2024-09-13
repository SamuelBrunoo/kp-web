import { TClient } from "../data/client"
import { TColor } from "../data/color"
import { TModel } from "../data/model"
import { TOrder } from "../data/order"
import { TProduct } from "../data/product"
import { TProductType } from "../data/productType"
import { TRepresentative } from "../data/representative"

// Success
type TSuccessResponse<T> = {
  success: true
  data: T
}

// Error
type TErrorResponse = {
  success: false
  error: {
    message: string
  }
}

// Response Structure

export type TDefaultBodyRes<T> = TSuccessResponse<T> | TErrorResponse

type TDefaultRes<T> = Promise<TDefaultBodyRes<T>>

export type TResData = {
  colors: { list: TColor[] }
  productTypes: { list: TProductType[] }

  products: { list: TProduct[] }
  product: { product: TProduct }

  models: { list: TModel[] }
  model: { model: TModel; variations: TProduct[] }

  clients: { list: TClient[] }
  client: { client: TClient }

  representatives: { list: TRepresentative[] }
  representative: { client: TRepresentative }

  orders: { list: TOrder[] }
  order: { client: TOrder }

  // New
  newProduct: { product: TProduct }
  newModel: { model: TModel }
  newClient: { client: TClient }
  newRepresentative: { representative: TRepresentative }
  newOrder: { representative: TOrder }

  updateProduct: { product: TProduct }
  updateModel: { model: TModel }
  updateClient: { client: TClient }
  updateRepresentative: { representative: TRepresentative }
  updateOrder: { order: TOrder }

  deleteProduct: {}
  deleteModel: {}
  deleteClient: {}
  deleteRepresentative: {}
  deleteOrder: {}

  pageInfo: {
    productForm: {
      prodTypes: TProductType[]
      models: TModel[]
      colors: TColor[]
    }
    models: {
      list: TModel[]
    }
  }
}

export type TResponses = {
  new: {
    product: TDefaultRes<TResData["newProduct"]>
    model: TDefaultRes<TResData["newModel"]>
    client: TDefaultRes<TResData["newClient"]>
    representative: TDefaultRes<TResData["newRepresentative"]>
    order: TDefaultRes<TResData["newOrder"]>
  }
  update: {
    product: TDefaultRes<TResData["updateProduct"]>
    model: TDefaultRes<TResData["updateModel"]>
    client: TDefaultRes<TResData["updateClient"]>
    representative: TDefaultRes<TResData["updateRepresentative"]>
    order: TDefaultRes<TResData["updateOrder"]>
  }
  get: {
    colors: TDefaultRes<TResData["colors"]>
    products: TDefaultRes<TResData["products"]>
    product: TDefaultRes<TResData["product"]>
    productTypes: TDefaultRes<TResData["productTypes"]>
    models: TDefaultRes<TResData["models"]>
    model: TDefaultRes<TResData["model"]>
    clients: TDefaultRes<TResData["clients"]>
    client: TDefaultRes<TResData["client"]>
    representatives: TDefaultRes<TResData["representatives"]>
    representative: TDefaultRes<TResData["representative"]>
    orders: TDefaultRes<TResData["orders"]>
    order: TDefaultRes<TResData["order"]>
  }
  delete: {
    product: TDefaultRes<TResData["deleteProduct"]>
    model: TDefaultRes<TResData["deleteModel"]>
    client: TDefaultRes<TResData["deleteClient"]>
    representative: TDefaultRes<TResData["deleteRepresentative"]>
    order: TDefaultRes<TResData["deleteOrder"]>
  }
  pageInfo: {
    productForm: TDefaultRes<TResData["pageInfo"]["productForm"]>
    models: TDefaultRes<TResData["pageInfo"]["models"]>
  }
}

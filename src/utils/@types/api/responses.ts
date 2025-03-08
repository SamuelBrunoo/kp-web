import { TClient } from "../data/client"
import { TColor } from "../data/color"
import { TEmmitter } from "../data/emmitter"
import { TModel } from "../data/model"
import { TOrder } from "../data/order"
import { TProduct } from "../data/product"
import { TProductType } from "../data/productType"
import { TProductionLine } from "../data/productionLine"
import { TRepresentative } from "../data/representative"

// Success
type TSuccessResponse<T> = {
  ok: true
  data: T
}

// Error
export type TErrorResponse = {
  ok: false
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
  order: { order: TOrder }

  productionLines: { list: TProductionLine[] }
  productionLine: { productionLine: TProductionLine }

  // New
  newProduct: { product: TProduct }
  newModel: { model: TModel }
  newClient: { client: TClient }
  newRepresentative: { representative: TRepresentative }
  newOrder: { representative: TOrder }
  newProductionLine: { productionLine: TProductionLine }

  updateProduct: { product: TProduct }
  updateModel: { model: TModel }
  updateClient: { client: TClient }
  updateRepresentative: { representative: TRepresentative }
  updateOrder: { order: TOrder }
  updateProductionLine: { productionLine: TProductionLine }

  deleteProduct: {}
  deleteModel: {}
  deleteClient: {}
  deleteRepresentative: {}
  deleteOrder: {}
  deleteProductionLine: {}

  pageInfo: {
    productForm: {
      prodTypes: TProductType[]
      models: TModel[]
      colors: TColor[]
    }
    orderForm: {
      clients: TClient[]
      emmitters: TEmmitter[]
      representatives: TRepresentative[]
      products: TProduct[]
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
    productionLine: TDefaultRes<TResData["newProductionLine"]>
  }
  update: {
    product: TDefaultRes<TResData["updateProduct"]>
    model: TDefaultRes<TResData["updateModel"]>
    client: TDefaultRes<TResData["updateClient"]>
    representative: TDefaultRes<TResData["updateRepresentative"]>
    order: TDefaultRes<TResData["updateOrder"]>
    productionLine: TDefaultRes<TResData["updateProductionLine"]>
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
    productionLines: TDefaultRes<TResData["productionLines"]>
    productionLine: TDefaultRes<TResData["productionLine"]>
  }
  delete: {
    product: TDefaultRes<TResData["deleteProduct"]>
    model: TDefaultRes<TResData["deleteModel"]>
    client: TDefaultRes<TResData["deleteClient"]>
    representative: TDefaultRes<TResData["deleteRepresentative"]>
    order: TDefaultRes<TResData["deleteOrder"]>
    productionLine: TDefaultRes<TResData["deleteProductionLine"]>
  }
  pageInfo: {
    productForm: TDefaultRes<TResData["pageInfo"]["productForm"]>
    orderForm: TDefaultRes<TResData["pageInfo"]["orderForm"]>
    models: TDefaultRes<TResData["pageInfo"]["models"]>
  }
}

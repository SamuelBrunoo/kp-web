import { TClient } from "../data/client"
import { TColor } from "../data/color"
import { TModel } from "../data/model"
import { TProduct } from "../data/product"
import { TProductType } from "../data/productType"

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

  // New
  newProduct: { product: TProduct }
  newModel: { model: TModel }
  newClient: { client: TClient }

  updateProduct: { product: TProduct }
  updateModel: { model: TModel }
  updateClient: { client: TClient }

  deleteProduct: {}
  deleteModel: {}
  deleteClient: {}

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
  }
  update: {
    product: TDefaultRes<TResData["updateProduct"]>
    model: TDefaultRes<TResData["updateModel"]>
    client: TDefaultRes<TResData["updateClient"]>
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
  }
  delete: {
    product: TDefaultRes<TResData["deleteProduct"]>
    model: TDefaultRes<TResData["deleteModel"]>
    client: TDefaultRes<TResData["deleteClient"]>
  }
  pageInfo: {
    productForm: TDefaultRes<TResData["pageInfo"]["productForm"]>
    models: TDefaultRes<TResData["pageInfo"]["models"]>
  }
}

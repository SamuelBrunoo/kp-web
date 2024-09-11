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
  products: { list: TProduct[] }
  product: { product: TProduct }
  productTypes: { list: TProductType[] }
  models: { list: TModel[] }
  model: { model: TModel; variations: TProduct[] }

  newProduct: { product: TProduct }
  newModel: { model: TModel }

  updateProduct: { product: TProduct }
  updateModel: { model: TModel }

  deleteProduct: {}
  deleteModel: {}

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
  }
  update: {
    product: TDefaultRes<TResData["updateProduct"]>
    model: TDefaultRes<TResData["updateModel"]>
  }
  get: {
    colors: TDefaultRes<TResData["colors"]>
    products: TDefaultRes<TResData["products"]>
    product: TDefaultRes<TResData["product"]>
    productTypes: TDefaultRes<TResData["productTypes"]>
    models: TDefaultRes<TResData["models"]>
    model: TDefaultRes<TResData["model"]>
  }
  delete: {
    product: TDefaultRes<TResData["deleteProduct"]>
    model: TDefaultRes<TResData["deleteModel"]>
  }
  pageInfo: {
    productForm: TDefaultRes<TResData["pageInfo"]["productForm"]>
    models: TDefaultRes<TResData["pageInfo"]["models"]>
  }
}

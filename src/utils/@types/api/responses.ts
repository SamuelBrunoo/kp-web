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
  products: { list: TProduct[] }
  pageInfo: {
    productForm: {
      prodTypes: TProductType[]
      models: TModel[]
      colors: TColor[]
    }
  }
}

export type TResponses = {
  get: {
    products: TDefaultRes<TResData["products"]>
  }
  pageInfo: {
    productForm: TDefaultRes<TResData["pageInfo"]["productForm"]>
  }
}

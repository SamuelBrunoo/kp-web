import { TProduct } from "../data/product"

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
}

export type TResponses = {
  get: {
    products: TDefaultRes<TResData["products"]>
  }
}

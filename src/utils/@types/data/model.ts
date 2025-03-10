import { TProduct } from "./product"

export type TModel = {
  id: string
  code: string
  type: string
  name: string
  colors: string[]
  storage: {
    has: boolean
    quantity: number
  }
  price: number
}

export type TPageListModel = {
  id: string
  code: string
  colors: number
  name: string
  price: number
  type: string
  typeKey: string
  storage: {
    has: boolean
    quantity: number
  }
}

export type TModelDetails = {
  model: TModel
  variations: (TProduct & {
    color: string
    price: number
  })[]
}

export type TNewModel = {
  code: string
  type: string
  name: string
  price: number
}

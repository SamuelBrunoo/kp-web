export type TProduct = {
  id: string
  code: string
  model: TModel
  colors: TColor[]
  price: number
  type: TProductType
  storage: {
    has: boolean
    quantity: number
  }
}

type TModel = {
  name: string
  code: string
}

type TColor = {
  key: string
  name: string
}

type TProductType = {
  code: string
  key: string
  name: string
}

export type TNewProduct = {
  code: string
  name: string
  color: TColor[]
  price: number
  type: TProductType
  storage: {
    has: boolean
    quantity: number
  }
}

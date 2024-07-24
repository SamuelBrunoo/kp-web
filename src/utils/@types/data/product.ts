export type TProduct = {
  id: string
  code: string
  model: TModel
  colors: TColor[]
  price: number
  type: TType
  storage: {
    has: boolean
    quantity: number
  }
}

export type TModel = {
  name: string
  code: string
}

export type TColor = {
  key: string
  name: string
}

export type TType = {
  code: string
  key: string
  name: string
}

export type TNewProduct = {
  code: string
  name: string
  color: TColor[]
  price: number
  type: TType
  storage: {
    has: boolean
    quantity: number
  }
}

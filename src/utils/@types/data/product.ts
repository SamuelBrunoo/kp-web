export type TProduct = {
  id: string
  active: boolean
  code: string
  model: string
  color: string
  price: number
  type: string
  storage: {
    has: boolean
    quantity: number
  }
}

export type TPageListProduct = {
  id: string
  active: boolean
  code: string
  model: string
  color: string
  price: number
  type: string
  typeKey: string
  storage: string | number
  deletable: boolean
}

export type TNewProduct = {
  active: boolean
  code: string
  model: string
  color: string
  type: string
  storage: {
    has: boolean
    quantity: number
  }
}

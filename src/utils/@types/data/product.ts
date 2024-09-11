export type TProduct = {
  id: string
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

export type TNewProduct = {
  code: string
  model: string
  color: string
  type: string
  storage: {
    has: boolean
    quantity: number
  }
}

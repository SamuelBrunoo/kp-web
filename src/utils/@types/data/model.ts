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

export type TNewModel = {
  code: string
  type: string
  name: string
  price: number
}

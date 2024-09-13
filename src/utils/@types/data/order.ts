import { TClient } from "./client"
import { TProduct } from "./product"

export type TNewOrder = {
  client: string
  orderDate: number
  value: number
  status: string
  products: TOrderProduct[]
  total: {
    products: number
    value: number
  }
  deadline: string
  representative: string
  payment: {
    type: TPayment
    paymentCode: string
    paymentNumber: string
    status: string
  }
  shippingType: TShipping
  emmitter: string
}

export type TOrder = {
  id: string
  client: TClient
  orderDate: number
  value: number
  status: string
  products: TOrderProduct[]
  total: {
    products: number
    value: number
  }
  deadline: string
  representative?: string
  payment: {
    type: TPayment
    paymentCode: string
    paymentNumber: string
    status: string
  }
  shippingType: TShipping
  emmitter: string
}

type TOrderProduct = TProduct & {
  quantity: number
  status: string
}

export type TPayment = "pix" | "cash" | "slip"

export type TShipping = "transporter" | "representative" | "mail"

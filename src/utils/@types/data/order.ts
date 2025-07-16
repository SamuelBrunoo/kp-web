import { TClient } from "./client"
import { TPaymentStatus } from "./payment"
import { TProduct } from "./product"

export type TNewOrder = {
  client: string
  orderDate: number
  shippedAt?: number | null
  deadline: number | string | Date
  value: number
  status: TOPStatus
  products: TOrderProduct[]
  observations: string
  totals: {
    products: number
    value: number
    commission: number
    liquid: number
  }
  representative: string
  payment: TPaymentConfig
  shippingType: TShipping
  shippingMode: TShippingMode
  emmitter: string
}

export type TOrder = {
  id: string
  code: string
  client: TClient
  shippedAt: number
  orderDate: number
  deadline: string
  value: number
  status: TOPStatus
  products: TOrderProduct[]
  productsIds: string[]
  observations: string
  totals: {
    products: number
    value: number
  }
  representative?: string
  payment: TPaymentConfig
  shippingType: TShipping
  shippingMode: TShippingMode
  emmitter: string
}

export type TPageListOrder = {
  id: string
  code: string
  clientName: string
  orderDate: string
  value: number
  quantity: number
  status: TOPStatus
  details: {
    productionLineId: string | null
    products: TOrderDetailsProduct[]
    additional: {
      clientName: string
      clientRegister: string
      clientStateInscription: string | null
      orderDate: string
      observations: string
      deadline: string
      shippedAt: string | number | number
      valueTotal: number
      valueCommission: number
      valueLiquid: number
      paymentMethod: TPayment
      hasInstallments: string
      installments: number
      paidInstallments: number
      emmitter: string
      representative: string | null
      address: string
    }
    paymentSlips?: Slip[]
  }
}

type TOrderDetailsProduct = {
  id: string
  model: string
  name: string
  color: string
  price: number
  type: string
  quantity: number
  status: TOPStatus
}

export type TOrderProduct = TProduct & {
  name?: string
  quantity: number
  status: TOPStatus
}

export type TPayment = "pix" | "cash" | "slip"

export type TPaymentConfig = {
  hasInstallments: boolean
  installments: number
  type: TPayment
  paymentCode: string
  paymentNumber: string
  status: string
  due: string | number
  slips?: (UnfilledSlip | Slip)[]
}

export type UnfilledSlip = {
  installment: number
  dueDate: string
}

export type Slip = {
  installment: number
  value: number
  dueDate: string
  status: TPaymentStatus
  barCode: string
  cleanCode: string
  nossoNumero: string
  txid: string
  qrCode: string
}

export type TShipping = "transporter" | "representative" | "mail"
export type TShippingMode = "sedex" | "pac"

export type TOPStatus = "queued" | "lor" | "doing" | "done"

export const TOPStatusWeight = {
  done: 1,
  queued: 2,
  doing: 3,
  lor: 4,
}

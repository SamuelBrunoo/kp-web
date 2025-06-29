import { TDefaultRes } from "../../types/responses"

export type TApi_Responses_Payments = {
  payments: {
    generateOrderPayment: Promise<TDefaultRes<any>>
  }
}

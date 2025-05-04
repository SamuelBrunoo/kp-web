import { TPaymentConfig } from "../../@types/data/payment"
import { formatMoney } from "./money"

export const getRepresentativeComissionString = (
  paymentConfig: TPaymentConfig["representative"]
) => {
  let str = ""

  if (paymentConfig.commissionType === "fixed")
    str = formatMoney(paymentConfig.value)
  else str = `${(paymentConfig.value / 10).toFixed(1)}%`

  return str
}

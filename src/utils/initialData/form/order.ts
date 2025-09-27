import { TNewOrder } from "../../@types/data/order"
import { getMinDeadline } from "../../helpers/date"

export const initialOrder: TNewOrder = {
  client: "",
  shippedAt: null,
  orderDate: new Date().getTime(),
  value: 0,
  status: "todo",
  productionStatus: "queued",
  products: [],
  observations: "",
  totals: {
    products: 0,
    value: 0,
    commission: 0,
    liquid: 0,
  },
  deadline: getMinDeadline(14),
  representative: "",
  payment: {
    hasInstallments: false,
    installments: 1,
    due: 15,
    type: "pix",
  },
  shippingType: "mail",
  shippingMode: "sedex",
  emmitter: "",
}

import { TNewOrder } from "../@types/data/order"
import { getMinDeadline } from "../helpers/date"

const order: TNewOrder = {
  client: "",
  orderDate: new Date().getTime(),
  value: 0,
  status: "queued",
  products: [],
  productsIds: [],
  total: {
    products: 0,
    value: 0,
  },
  deadline: getMinDeadline(14),
  representative: "",
  payment: {
    hasInstallments: true,
    installments: 1,
    due: 15,
    type: "slip",
    paymentCode: "",
    paymentNumber: "",
    status: "",
  },
  shippingType: "mail",
  shippingMode: "sedex",
  emmitter: "",
}

export const initialForm = {
  product: {
    type: "",
    model: "",
    color: "",
    code: "XXXXX",
    storage: {
      has: true,
      quantity: 0,
    },
  },
  model: {
    type: "",
    name: "",
    code: "",
    price: "",
  },
  client: {
    type: "",
    clientName: "",
    personName: "",
    socialRole: "",
    phone1: "",
    phone2: "",
    documents: {
      register: "",
      stateInscription: "",
      cityInscription: "",
    },
    address: {
      full: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
    },
    email: "",
    phone: "",
    representative: "",
  },
  order,
}

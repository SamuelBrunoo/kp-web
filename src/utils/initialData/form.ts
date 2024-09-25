import { TNewOrder } from "../@types/data/order"

const order: TNewOrder = {
  client: "",
  orderDate: new Date().getTime(),
  value: 0,
  status: "queued",
  products: [],
  total: {
    products: 0,
    value: 0,
  },
  deadline: new Date().getTime(),
  representative: "",
  payment: {
    type: "pix",
    paymentCode: "",
    paymentNumber: "",
    status: "",
  },
  shippingType: "mail",
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
    name: "",
    socialRole: "",
    cpf: "",
    cnpj: "",
    stateRegister: "",
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

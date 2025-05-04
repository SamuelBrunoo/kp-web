import { TNewOrder } from "../@types/data/order"
import { TNewRepresentative } from "../@types/data/representative"
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

const baseAddress = {
  full: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
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
    address: baseAddress,
    email: "",
    phone: "",
    representative: "",
  },
  order,
  representative: {
    address: baseAddress,
    email: "",
    name: "",
    phone: "",
    phone2: "",
    paymentConfig: {
      commissionType: "percentage",
      dateLimit: 15,
      dateLimit2: 25,
      paymentMethod: "pix",
      period: "monthly",
      value: 0,
    },
    registers: {
      cpf: "",
      cnpj: "",
    },
  } as TNewRepresentative,
}

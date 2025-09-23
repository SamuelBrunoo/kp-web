import { TNewRepresentative } from "../../@types/data/representative"
import { baseAddress } from "../address"

export const initialRepresentative = {
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
} as TNewRepresentative

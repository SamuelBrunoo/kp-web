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
  },
}

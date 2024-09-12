export type TClient = {
  id: string
  name: string
  socialRole: string
  cpf?: string
  cnpj?: string
  stateRegister: string
  address: {
    full: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  email: string
  phone: string
  orders: string[]
}

export type TNewClient = {
  name: string
  socialRole: string
  cpf?: string
  cnpj?: string
  stateRegister: string
  address: {
    full: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  email: string
  phone: string
}

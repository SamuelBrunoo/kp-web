export type TClientType = "juridical" | "physical"

export type TBaseClient = {
  id: string
  type: TClientType
  clientName: string
  personName: string
  socialRole: string
  phone1: string
  phone2: string
  documents: {
    register: string
    stateInscription: string
    cityInscription: string
  }
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
  representative: string
}

export type TClient = {
  id: string
  type: TClientType
  clientName: string
  personName: string
  socialRole: string
  phone1: string
  phone2: string
  documents: {
    register: string
    stateInscription: string
    cityInscription: string
  }
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
  orders: string[]
  representative: string
}

export type TNewClient = {
  type: TClientType
  clientName: string
  personName: string
  socialRole: string
  phone1: string
  phone2: string
  documents: {
    register: string
    stateInscription: string
    cityInscription: string
  }
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
  representative: string
}

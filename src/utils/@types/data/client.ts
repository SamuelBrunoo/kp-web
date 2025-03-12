import { TAddress } from "./address"

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
  address: TAddress
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

export type TPageListClient = {
  id: string
  type: TClientType
  name: string
  address: TAddress
  cep: string
  document: string
  stateIncription: string
  orders: number
  deletable: boolean
  details: TClient
}

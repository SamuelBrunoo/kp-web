export type TFBState = {
  name: string
  abbreviation: string
}

export type TBaseState = {
  id: string
  name: string
  abbreviation: string
}

export type TState = {
  id: string
  name: string
  abbreviation: string
  country: string
}

export type TAddress = {
  full: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  cep: string
}

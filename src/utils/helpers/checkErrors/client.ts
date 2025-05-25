import { getInvalidCheck } from "."
import { TNewClient } from "../../@types/data/client"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { cepValidator } from "../validators/cep"
import { cnpjValidator } from "../validators/cnpj"
import { cpfValidator } from "../validators/cpf"
import { phoneValidator } from "../validators/phone"
import { validEmail } from "./email"

type Params = TNewClient

export const clientCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.clientName.trim()) state = getInvalidCheck(state, "clientName")
  if (!data.socialRole.trim()) state = getInvalidCheck(state, "socialRole")
  if (!data.personName.trim()) state = getInvalidCheck(state, "personName")

  if (!data.email.trim() || !validEmail(data.email))
    state = getInvalidCheck(state, "email")
  if (!phoneValidator(data.phone1)) state = getInvalidCheck(state, "phone1")
  if (!!data.phone2 && !phoneValidator(data.phone2))
    state = getInvalidCheck(state, "phone2")

  // Documentation
  if (data.type === "juridical") {
    if (!cnpjValidator(data.documents.register))
      state = getInvalidCheck(state, "documents.register")
  } else if (data.type === "physical") {
    if (!cpfValidator(data.documents.register))
      state = getInvalidCheck(state, "documents.register")
  }

  // Address
  if (!data.address.state || !data.address.state.trim())
    state = getInvalidCheck(state, "address.state")
  if (!data.address.street.trim())
    state = getInvalidCheck(state, "address.street")
  if (!data.address.number.trim())
    state = getInvalidCheck(state, "address.number")
  if (!data.address.neighborhood.trim())
    state = getInvalidCheck(state, "address.neighborhood")
  if (!data.address.city.trim()) state = getInvalidCheck(state, "address.city")
  if (!cepValidator(data.address.cep))
    state = getInvalidCheck(state, "address.cep")

  return state
}

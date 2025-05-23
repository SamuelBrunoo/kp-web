import { getInvalidCheck } from "."
import { TNewRepresentative } from "../../@types/data/representative"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { cepValidator } from "../validators/cep"
import { cnpjValidator } from "../validators/cnpj"
import { cpfValidator } from "../validators/cpf"
import { phoneValidator } from "../validators/phone"
import { validEmail } from "./email"

type Params = TNewRepresentative

export const representativeCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!data.email.trim() || !validEmail(data.email))
    state = getInvalidCheck(state, "email")
  if (!phoneValidator(data.phone)) state = getInvalidCheck(state, "phone")
  if (!!data.phone2 && !phoneValidator(data.phone2))
    state = getInvalidCheck(state, "phone2")

  const pc = data.paymentConfig
  // Commission
  if (
    Number.isNaN(+String(pc.value).replace(/\D/g, "")) ||
    +String(pc.value).replace(/\D/g, "") === 0
  )
    state = getInvalidCheck(state, "commission.value")
  if (!pc.dateLimit) state = getInvalidCheck(state, "commission.dateLimit")
  if (pc.period === "dualweek" && !pc.dateLimit2)
    state = getInvalidCheck(state, "commission.dateLimit2")
  if (!pc.paymentAddress)
    state = getInvalidCheck(state, "commission.paymentAddress")

  // Documentation
  if (!cpfValidator(data.registers.cpf))
    state = getInvalidCheck(state, "registers.cpf")
  if (!!data.registers.cnpj && !cnpjValidator(data.registers.cnpj))
    state = getInvalidCheck(state, "registers.cnpj")

  // Address
  if (!data.address.street.trim())
    state = getInvalidCheck(state, "address.street")
  if (!data.address.state.trim())
    state = getInvalidCheck(state, "address.state")
  if (!data.address.number.trim())
    state = getInvalidCheck(state, "address.number")
  if (!data.address.neighborhood.trim())
    state = getInvalidCheck(state, "address.neighborhood")
  if (!data.address.city.trim()) state = getInvalidCheck(state, "address.city")
  if (!cepValidator(data.address.cep))
    state = getInvalidCheck(state, "address.cep")

  return state
}

import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { representativeCheck } from "./representative"
import { productCheck } from "./product"
import { modelCheck } from "./model"
import { clientCheck } from "./client"
import { orderCheck } from "./order"

export const checkErrors = {
  representative: representativeCheck,
  product: productCheck,
  model: modelCheck,
  client: clientCheck,
  order: orderCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}

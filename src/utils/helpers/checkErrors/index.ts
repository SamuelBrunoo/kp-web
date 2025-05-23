import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { representativeCheck } from "./representative"
import { productCheck } from "./product"
import { modelCheck } from "./model"

export const checkErrors = {
  representative: representativeCheck,
  product: productCheck,
  model: modelCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}

import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { representativeCheck } from "./representative"
import { productCheck } from "./product"

export const checkErrors = {
  representative: representativeCheck,
  product: productCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}

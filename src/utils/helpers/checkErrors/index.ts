import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { representativeCheck } from "./representative"

export const checkErrors = {
  representative: representativeCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}

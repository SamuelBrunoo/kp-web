import { getInvalidCheck } from "."
import { TNewProduct } from "../../@types/data/product"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewProduct

export const productCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.type.trim()) state = getInvalidCheck(state, "type")
  if (!data.model.trim()) state = getInvalidCheck(state, "model")
  if (!data.color.trim()) state = getInvalidCheck(state, "color")
  if (!data.storage || Number.isNaN(+data.storage.quantity))
    state = getInvalidCheck(state, "storage.quantity")

  return state
}

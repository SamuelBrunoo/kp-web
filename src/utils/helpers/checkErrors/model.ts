import { getInvalidCheck } from "."
import { TNewModel } from "../../@types/data/model"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewModel

export const modelCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.type.trim()) state = getInvalidCheck(state, "type")
  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!data.code.trim()) state = getInvalidCheck(state, "code")
  if (!String(data.price) || Number.isNaN(+data.price) || +data.price < 1)
    state = getInvalidCheck(state, "price")

  return state
}

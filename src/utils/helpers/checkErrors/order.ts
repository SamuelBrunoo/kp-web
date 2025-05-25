import { getInvalidCheck } from "."
import { TNewOrder } from "../../@types/data/order"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewOrder

export const orderCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.client.trim()) state = getInvalidCheck(state, "client")
  if (+data.value < 1) state = getInvalidCheck(state, "value")

  return state
}

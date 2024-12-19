import { TNewOrder, TOrder } from "../../@types/data/order"

export const validateNewOrder = (form: TNewOrder | TOrder) => {
  let response: {
    hasErrors: boolean
    fields: string[]
    message: string
  } = {
    hasErrors: false,
    fields: [],
    message: "",
  }

  if (!form.client) response.fields.push("cliente")

  if (form.products.length === 0) response.fields.push("produtos")

  // confirm hasErrors
  if (response.fields.length > 0) response.hasErrors = true

  // Message

  if (response.hasErrors) {
    let message = ""

    if (response.fields.length > 1) {
      const str = response.fields.join(", ")
      const rest = str.slice(0, str.lastIndexOf(", "))
      const last = str.slice(str.lastIndexOf(", ") + 1)
      const fieldsStr = `${rest.trim()} e ${last.trim()}`
      message = `Ops, verifique o${
        response.fields.length > 1 ? "s" : ""
      } campo${
        response.fields.length > 1 ? "s" : ""
      } ${fieldsStr} e tente novamente`
    } else if (response.fields.length === 1) {
      message = `Ops, verifique o campo ${response.fields[0]} e tente novamente`
    }

    response.message = message
  }

  return response
}

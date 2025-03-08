import { TFormValidator } from "../../@types/sys/formValidator"
import { validEmail } from "../checkErrors/email"

type TForm = {
  email: string
  password: string
}

export const validateLogin = (form: TForm): TFormValidator => {
  let response: TFormValidator = {
    hasErrors: false,
    fields: [],
    fieldsNames: [],
    message: "",
  }

  if (!form.email || !validEmail(form.email)) {
    response.fields.push("email")
    response.fieldsNames.push("email")
  }

  if (!form.password || form.password.trim().length === 0) {
    response.fields.push("password")
    response.fieldsNames.push("senha")
  }

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

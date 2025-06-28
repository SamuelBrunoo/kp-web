import { TDefaultBodyRes, TErrorResponse } from "../utils/@types/api/responses"
import { logout } from "../utils/helpers/api/auth"

export const initialResponse: TErrorResponse = {
  ok: false,
  error: { message: "" },
}

export const defaultErrors: {
  [type: string]: TErrorResponse
} = {
  connection: {
    ok: false,
    error: {
      message: "Verifique a conexão e tente novamente",
    },
  },
}

export const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    ok: true,
    data: info,
  }
}

export const handleLogout = () => {
  logout()

  window.location.href = "/login"
}

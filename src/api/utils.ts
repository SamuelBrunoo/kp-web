import { TDefaultBodyRes, TErrorResponse } from "../utils/@types/api/responses"

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

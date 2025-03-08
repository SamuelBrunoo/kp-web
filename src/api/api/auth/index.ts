import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Auth as TParams } from "./params"
import { TApi_Responses_Auth as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/auth"

export const login: TApi["auth"]["login"] = async ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}/login`, { email, pass: password })
        .then((res) => {
          if (res.data.success) {
            const info = res.data.data

            resolve({
              ok: true,
              data: info,
            })
          } else resolve(getApiError(res))
        })
        .catch((err: AxiosError) => {
          resolve(getApiError(err))
        })
    } catch (error) {
      reject({
        error: "Não foi possível listar as cores. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Auth = {
  login: (p: TParams["auth"]["login"]) => TResponses["auth"]["login"]
}

export const apiAuth: TApi["auth"] = {
  login: login,
}

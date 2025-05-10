import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Dashboard as TParams } from "./params"
import { TApi_Responses_Dashboard as TResponses } from "./responses"

const baseURL = "/dashboard"

export const adminDashboard: TApi["dashboard"]["admin"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: filters,
        })
        .then((res) => {
          const info = res.data.data

          if (info) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível listar as informações. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível listar as informações. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível listar as informações. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Dashboard = {
  admin: (p: TParams["dashboard"]["admin"]) => TResponses["dashboard"]["admin"]
}

export const apiDashboard: TApi["dashboard"] = {
  admin: adminDashboard,
}

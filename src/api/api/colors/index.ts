import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Colors as TParams } from "./params"
import { TApi_Responses_Colors as TResponses } from "./responses"

const baseURL = "/colors"

export const getColors: TApi["colors"]["getColors"] = async (filters) => {
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
                  "Não foi possível listar as cores. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível listar as cores. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível listar as cores. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getColor: TApi["colors"]["getColor"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          const info = res.data

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
                  "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Colors = {
  getColors: (
    p: TParams["colors"]["getColors"]
  ) => TResponses["colors"]["getColors"]
  getColor: (
    p: TParams["colors"]["getColor"]
  ) => TResponses["colors"]["getColor"]
}

export const apiColors: TApi["colors"] = {
  getColors: getColors,
  getColor: getColor,
}

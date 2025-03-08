import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Representatives as TParams } from "./params"
import { TApi_Responses_Representatives as TResponses } from "./responses"

const baseURL = "/representatives"

export const getRepresentatives: TApi["representatives"]["getRepresentatives"] =
  async (filters) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .get(`${baseURL}`, {
            params: filters,
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

export const getRepresentative: TApi["representatives"]["getRepresentative"] =
  async ({ id }) => {
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

export type TApi_Representatives = {
  getRepresentatives: (
    p: TParams["representatives"]["getRepresentatives"]
  ) => TResponses["representatives"]["getRepresentatives"]
  getRepresentative: (
    p: TParams["representatives"]["getRepresentative"]
  ) => TResponses["representatives"]["getRepresentative"]
}

export const apiRepresentatives: TApi["representatives"] = {
  getRepresentatives: getRepresentatives,
  getRepresentative: getRepresentative,
}

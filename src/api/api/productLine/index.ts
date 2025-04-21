import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_ProductionLines as TParams } from "./params"
import { TApi_Responses_ProductionLines as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/productionLines"

export const getProductionLinesPageList: TApi["productionLines"]["getProductionLinesPageList"] =
  async ({ showType }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .get(`${baseURL}/listPage/${showType}`)
          .then((res) => {
            if (res.data.success) {
              const info = res.data.data
              resolve({
                ok: true,
                data: info,
              })
            } else {
              resolve(getApiError(res))
            }
          })
          .catch((err: AxiosError) => {
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível listar as produções. Tente novamente mais tarde.",
              },
            })
          })
      } catch (error) {
        reject({
          error: {
            message:
              "Não foi possível listar as produções. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export const getProductionLines: TApi["productionLines"]["getProductionLines"] =
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

export const getProductionLine: TApi["productionLines"]["getProductionLine"] =
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

export type TApi_ProductionLines = {
  getProductionLinesPageList: (
    p: TParams["productionLines"]["getProductionLinesPageList"]
  ) => TResponses["productionLines"]["getProductionLinesPageList"]
  getProductionLines: (
    p: TParams["productionLines"]["getProductionLines"]
  ) => TResponses["productionLines"]["getProductionLines"]
  getProductionLine: (
    p: TParams["productionLines"]["getProductionLine"]
  ) => TResponses["productionLines"]["getProductionLine"]
}

export const apiProductionLines: TApi["productionLines"] = {
  getProductionLinesPageList: getProductionLinesPageList,
  getProductionLines: getProductionLines,
  getProductionLine: getProductionLine,
}

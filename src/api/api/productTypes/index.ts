import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_ProductTypes as TParams } from "./params"
import { TApi_Responses_ProductTypes as TResponses } from "./responses"

const baseURL = "/productTypes"

export const getProductTypes: TApi["productTypes"]["getProductTypes"] = async (filters) => {
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
              error:
                "Não foi possível listar as cores. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as cores. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar as cores. Tente novamente mais tarde.",
      })
    }
  })
}

export const getProductType: TApi["productTypes"]["getProductType"] = async ({ id }) => {
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
              error:
                "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível obter as informações da cor. Tente novamente mais tarde.",
      })
    }
  })
}


export type TApi_ProductTypes = {
  getProductTypes: (
    p: TParams["productTypes"]["getProductTypes"]
  ) => TResponses["productTypes"]["getProductTypes"]
  getProductType: (
    p: TParams["productTypes"]["getProductType"]
  ) => TResponses["productTypes"]["getProductType"]
}

export const apiProductTypes: TApi["productTypes"] = {
  getProductTypes: getProductTypes,
  getProductType: getProductType,
}

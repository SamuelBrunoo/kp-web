import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_FormBare as TParams } from "./params"
import { TApi_Responses_FormBare as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/formBare"

export const modelBare: TApi["formBare"]["model"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/model`, {
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
            resolve(getApiError(res))
          }
        })
        .catch((err: AxiosError) => {
          resolve(getApiError(err))
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const clientBare: TApi["formBare"]["client"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/client`, {
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
            resolve(getApiError(res))
          }
        })
        .catch((err: AxiosError) => {
          resolve(getApiError(err))
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const orderBare: TApi["formBare"]["order"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/order`, {
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
            resolve(getApiError(res))
          }
        })
        .catch((err: AxiosError) => {
          resolve(getApiError(err))
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_FormBare = {
  model: (p: TParams["formBare"]["model"]) => TResponses["formBare"]["model"]
  client: (p: TParams["formBare"]["client"]) => TResponses["formBare"]["client"]
  order: (p: TParams["formBare"]["order"]) => TResponses["formBare"]["order"]
}

export const apiFormBare: TApi["formBare"] = {
  model: modelBare,
  client: clientBare,
  order: orderBare,
}

import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_FormBare as TParams } from "./params"
import { TApi_Responses_FormBare as TResponses } from "./responses"

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
            resolve({
              ok: false,
              error:
                "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível obter as informações para o formulário. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_FormBare = {
  model: (p: TParams["formBare"]["model"]) => TResponses["formBare"]["model"]
}

export const apiFormBare: TApi["formBare"] = {
  model: modelBare,
}

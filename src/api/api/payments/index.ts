import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Payments as TParams } from "./params"
import { TApi_Responses_Payments as TResponses } from "./responses"
import { TDefaultRes } from "../../types/responses"

const baseURL = "/payments"

export const generateOrderPayment: TApi["payments"]["generateOrderPayment"] =
  async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .post(`${baseURL}/order/generate`, data)
          .then((res) => {
            const ok = res.status === 201

            const result: TDefaultRes<any> = ok
              ? { ok: true, data: null }
              : {
                  ok: false,
                  error: {
                    message:
                      "Não foi possível gerar o pagamento. Tente novamente mais tarde.",
                  },
                }

            resolve(result)
          })
          .catch((err: AxiosError) => {
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível gerar o pagamento. Tente novamente mais tarde.",
              },
            })
          })
      } catch (error) {
        reject({
          error: {
            message:
              "Não foi possível gerar o pagamento. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export type TApi_Payments = {
  generateOrderPayment: (
    p: TParams["payments"]["generateOrderPayment"]
  ) => TResponses["payments"]["generateOrderPayment"]
}

export const apiPayments: TApi["payments"] = {
  generateOrderPayment: generateOrderPayment,
}

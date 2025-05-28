import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Colors as TParams } from "./params"
import { TApi_Responses_Colors as TResponses } from "./responses"

const baseURL = "/pdfs"

export const getOrderPdf: TApi["pdfs"]["getOrderPdf"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/order`, {
          params: {
            ...filters,
            forAdmin: filters.forAdmin ? "true" : "false",
          },
          responseType: "blob",
        })
        .then((res) => {
          const ok = res.status === 200

          const disposition = res.headers["Content-Disposition"]
          let filename = `Pedido${filters.forAdmin ? " completo" : ""}.pdf` // nome padrão

          if (disposition && disposition.includes("filename=")) {
            const match = disposition.match(/filename="?(.+?)"?$/)
            if (match && match[1]) {
              filename = match[1]
            }
          }

          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url

          link.setAttribute("download", filename)
          document.body.appendChild(link)
          link.click()
          link.remove()

          if (ok) resolve({ ok: true, data: null })
          else {
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível baixar o pdf. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível baixar o pdf. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message: "Não foi possível baixar o pdf. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Pdfs = {
  getOrderPdf: (
    p: TParams["pdfs"]["getOrderPdf"]
  ) => TResponses["pdfs"]["getOrderPdf"]
}

export const apiPdfs: TApi["pdfs"] = {
  getOrderPdf: getOrderPdf,
}

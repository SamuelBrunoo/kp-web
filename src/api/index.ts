import axios from "axios"
import { TApi } from "./types"
import { jwtDecode } from "jwt-decode"

// Api

import { apiModels } from "./api/models"
import { TDefaultBodyRes, TErrorResponse } from "../utils/@types/api/responses"
import { apiClients } from "./api/clients"
import { apiColors } from "./api/colors"
import { apiProducts } from "./api/products"
import { apiOrders } from "./api/orders"
import { apiProductionLines } from "./api/productLine"
import { apiRepresentatives } from "./api/representative"
import { apiProductTypes } from "./api/productTypes"
import { apiFormBare } from "./api/formBare"
import { apiAuth } from "./api/auth"
import { apiDashboard } from "./api/dashboard"
import { apiPdfs } from "./api/pdfs"

export const initialResponse: TErrorResponse = {
  ok: false,
  error: { message: "" },
}

export const defaultErrors: {
  [type: string]: TErrorResponse
} = {
  connection: {
    ok: false,
    error: {
      message: "Verifique a conexão e tente novamente",
    },
  },
}

export const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    ok: true,
    data: info,
  }
}

const backUrl = process.env.REACT_APP_API_BASE_URL

axios.defaults.baseURL = backUrl

const checkTokenExpiration = (token: string) => {
  try {
    const decoded = jwtDecode(token)

    const now = +new Date().getTime().toFixed(0)

    const exp = (decoded.exp as number) * 1000

    return now > exp
  } catch (error) {
    return true
  }
}

axios.interceptors.request.use(function (config) {
  try {
    const localToken = localStorage.getItem("token")

    if (localToken) {
      if (localToken === "undefined") {
        localStorage.removeItem("token")

        window.location.reload()
      } else {
        const isTokenExpired = checkTokenExpiration(localToken)

        if (isTokenExpired) {
          localStorage.removeItem("token")

          window.location.reload()
        } else config.headers.Authorization = `Bearer ${localToken}`
      }
    }

    return config
  } catch (error) {
    return config
  }
})

export const service = axios

export const Api: TApi = {
  auth: apiAuth,

  dashboard: apiDashboard,

  formBare: apiFormBare,

  models: apiModels,
  clients: apiClients,
  colors: apiColors,
  orders: apiOrders,
  productionLines: apiProductionLines,
  products: apiProducts,
  productTypes: apiProductTypes,
  representatives: apiRepresentatives,

  pdfs: apiPdfs,
}

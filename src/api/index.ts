import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { TApi } from "./types"

// Api

import { apiModels } from "./api/models"
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

import {
  initialResponse,
  defaultErrors,
  generateResponse,
  handleLogout,
} from "./utils"

export { initialResponse, defaultErrors, generateResponse }

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

// Api Config

const backUrl = process.env.REACT_APP_API_BASE_URL

axios.defaults.baseURL = backUrl

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token)
    else prom.reject(error)
  })
  failedQueue = []
}

axios.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig

    const isTokenError =
      err.response?.status === 403 && !(originalRequest as any)._retry

    if (isTokenError) {
      const localRefreshToken = localStorage.getItem("refreshToken") as string

      if (localRefreshToken) {
        if (
          isRefreshing &&
          !originalRequest.url?.includes("/auth/refreshToken")
        ) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                // @ts-ignore
                originalRequest.headers["Authorization"] = "Bearer " + token
                resolve(axios(originalRequest))
              },
              reject: (err: any) => reject(err),
            })
          })
        }

        // @ts-ignore
        originalRequest._retry = true
        isRefreshing = true

        try {
          if (!originalRequest.url?.includes("/auth/refreshToken")) {
            await Api.auth
              .refreshToken({
                token: localRefreshToken,
              })
              .then((res) => {
                if (res.ok) {
                  const data = res.data
                  localStorage.setItem("accessToken", data.accessToken)
                  localStorage.setItem("refreshToken", data.refreshToken)
                  axios.defaults.headers.common["Authorization"] =
                    "Bearer " + data.accessToken
                  processQueue(null, data.accessToken)
                  return axios(originalRequest)
                } else {
                  if (res.instructions?.loginRedirect) {
                    handleLogout()
                  } else throw new Error()
                }
              })
              .catch(() => {
                throw new Error()
              })
          }
        } catch (er) {
          processQueue(er, null)
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      } else {
        handleLogout()
      }
    }

    return Promise.reject(err)
  }
)

axios.interceptors.request.use(function (config) {
  try {
    const localToken = localStorage.getItem("accessToken")

    if (localToken) config.headers.Authorization = `Bearer ${localToken}`

    return config
  } catch (error) {
    return config
  }
})

export const service = axios

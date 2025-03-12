import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Clients as TParams } from "./params"
import { TApi_Responses_Clients as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/clients"

export const createClient: TApi["clients"]["createClient"] = async ({
  newClient,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newClient)
        .then((res) => {
          const info = res.data

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
            "Não foi possível cadastrar o cliente. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const updateClient: TApi["clients"]["updateClient"] = async ({
  client,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}`, client)
        .then((res) => {
          const info = res.data

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
            "Não foi possível atualizar o cliente. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getClients: TApi["clients"]["getClients"] = async (filters) => {
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
            "Não foi possível listar os clientes. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getClient: TApi["clients"]["getClient"] = async ({ id }) => {
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
            "Não foi possível obter as informações do cliente. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const deleteClient: TApi["clients"]["deleteClient"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .delete(`${baseURL}/${id}`)
        .then((res) => {
          const info = res.data

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
            "Não foi possível deletar o cliente. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Clients = {
  createClient: (
    p: TParams["clients"]["createClient"]
  ) => TResponses["clients"]["createClient"]
  updateClient: (
    p: TParams["clients"]["updateClient"]
  ) => TResponses["clients"]["updateClient"]
  getClients: (
    p: TParams["clients"]["getClients"]
  ) => TResponses["clients"]["getClients"]
  getClient: (
    p: TParams["clients"]["getClient"]
  ) => TResponses["clients"]["getClient"]
  deleteClient: (
    p: TParams["clients"]["deleteClient"]
  ) => TResponses["clients"]["deleteClient"]
}

export const apiClients: TApi["clients"] = {
  createClient: createClient,
  updateClient: updateClient,
  getClients: getClients,
  getClient: getClient,
  deleteClient: deleteClient,
}

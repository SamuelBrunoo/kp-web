import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Representatives as TParams } from "./params"
import { TApi_Responses_Representatives as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/representatives"

export const createRepresentative: TApi["representatives"]["createRepresentative"] =
  async ({ newRepresentative }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .post(`${baseURL}`, newRepresentative)
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
              "Não foi possível cadastrar o representante. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export const updateRepresentative: TApi["representatives"]["updateRepresentative"] =
  async ({ representative }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .put(`${baseURL}/${representative.id}`, representative)
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
              "Não foi possível atualizar o representante. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export const getRepresentativesListPage: TApi["representatives"]["getRepresentativesListPage"] =
  async (filters) => {
    return new Promise(async (resolve, reject) => {
      try {
        await service
          .get(`${baseURL}/listPage`, {
            params: filters,
          })
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
            resolve(getApiError(err))
          })
      } catch (error) {
        reject({
          error: {
            message:
              "Não foi possível listar os representantes. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

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

export const deleteRepresentative: TApi["representatives"]["deleteRepresentative"] =
  async ({ id }) => {
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
              "Não foi possível deletar o representante. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export type TApi_Representatives = {
  createRepresentative: (
    p: TParams["representatives"]["createRepresentative"]
  ) => TResponses["representatives"]["createRepresentative"]
  updateRepresentative: (
    p: TParams["representatives"]["updateRepresentative"]
  ) => TResponses["representatives"]["updateRepresentative"]
  getRepresentativesListPage: (
    p: TParams["representatives"]["getRepresentativesListPage"]
  ) => TResponses["representatives"]["getRepresentativesListPage"]
  getRepresentatives: (
    p: TParams["representatives"]["getRepresentatives"]
  ) => TResponses["representatives"]["getRepresentatives"]
  getRepresentative: (
    p: TParams["representatives"]["getRepresentative"]
  ) => TResponses["representatives"]["getRepresentative"]
  deleteRepresentative: (
    p: TParams["representatives"]["deleteRepresentative"]
  ) => TResponses["representatives"]["deleteRepresentative"]
}

export const apiRepresentatives: TApi["representatives"] = {
  createRepresentative: createRepresentative,
  updateRepresentative: updateRepresentative,
  getRepresentativesListPage: getRepresentativesListPage,
  getRepresentatives: getRepresentatives,
  getRepresentative: getRepresentative,
  deleteRepresentative: deleteRepresentative,
}

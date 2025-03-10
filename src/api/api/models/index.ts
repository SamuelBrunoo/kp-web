import { TApi } from "../../types"
import { service } from "../../"
import { AxiosError } from "axios"
import { TApi_Params_Models as TParams } from "./params"
import { TApi_Responses_Models as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/models"

export const createModel: TApi["models"]["createModel"] = async ({
  newModel,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newModel)
        .then((res) => {
          if (res.data.success) {
            const info = res.data
            resolve({
              ok: true,
              data: {
                model: info,
              },
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
            "Não foi possível cadastrar o modelo. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const updateModel: TApi["models"]["updateModel"] = async ({ model }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${model.id}`, model)
        .then((res) => {
          if (res.data.success) {
            const info = res.data.data
            resolve({
              ok: true,
              data: {
                model: info,
              },
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
            "Não foi possível atualizar o modelo. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getModels: TApi["models"]["getModels"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: {},
        })
        .then((res) => {
          if (res.data.success) {
            const info = res.data
            resolve({
              ok: true,
              data: {
                list: info,
              },
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
            "Não foi possível listar os modelos. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getModel: TApi["models"]["getModel"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/${id}`, {
          params: {},
        })
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: {
                model: info,
              },
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
            "Não foi possível acessar as informações do modelo. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getModelsPageList: TApi["models"]["getModelsPageList"] = async (
  filters
) => {
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
            "Não foi possível listar os modelos. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const deleteModel: TApi["models"]["deleteModel"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .delete(`${baseURL}/${id}`)
        .then((res) => {
          if (res.data.success) {
            const info = res.data
            console.log("Response", res, info)

            resolve({ ok: true, data: info })
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
            "Não foi possível excluir o modelo. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Models = {
  createModel: (
    p: TParams["models"]["createModel"]
  ) => TResponses["models"]["createModel"]
  updateModel: (
    p: TParams["models"]["updateModel"]
  ) => TResponses["models"]["updateModel"]
  getModels: (
    p: TParams["models"]["getModels"]
  ) => TResponses["models"]["getModels"]
  getModel: (
    p: TParams["models"]["getModel"]
  ) => TResponses["models"]["getModel"]
  getModelsPageList: (
    p: TParams["models"]["getModelsPageList"]
  ) => TResponses["models"]["getModelsPageList"]
  deleteModel: (
    p: TParams["models"]["deleteModel"]
  ) => TResponses["models"]["deleteModel"]
}

export const apiModels: TApi["models"] = {
  createModel: createModel,
  updateModel: updateModel,
  getModels: getModels,
  getModel: getModel,
  getModelsPageList: getModelsPageList,
  deleteModel: deleteModel,
}

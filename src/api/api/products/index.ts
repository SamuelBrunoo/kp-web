import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Products as TParams } from "./params"
import { TApi_Responses_Products as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/products"

export const createProduct: TApi["products"]["createProduct"] = async ({
  newProduct,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newProduct)
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
            "Não foi possível cadastrar o produto. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const updateProduct: TApi["products"]["updateProduct"] = async ({
  product,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${product.id}`, product)
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
            "Não foi possível atualizar o produto. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getProducts: TApi["products"]["getProducts"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: filters,
        })
        .then((res) => {
          const info = res.data.data

          if (res.data.success) {
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
            "Não foi possível listar os produtos. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getProduct: TApi["products"]["getProduct"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          const info = res.data.data

          if (res.data.success) {
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
            "Não foi possível obter as informações do produto. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getProductsPageList: TApi["products"]["getProductsPageList"] =
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
              "Não foi possível listar os produtos. Tente novamente mais tarde.",
          },
        })
      }
    })
  }

export const deleteProduct: TApi["products"]["deleteProduct"] = async ({
  id,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .delete(`${baseURL}`, {
          params: {
            id: id,
          },
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
            "Não foi possível excluir o produto. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const formBare: TApi["products"]["formBare"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`/formBare/product${id ? `?productId=${id}` : ""}`)
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
            "Não foi possível receber as informações. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export type TApi_Products = {
  createProduct: (
    p: TParams["products"]["createProduct"]
  ) => TResponses["products"]["createProduct"]
  updateProduct: (
    p: TParams["products"]["updateProduct"]
  ) => TResponses["products"]["updateProduct"]
  getProducts: (
    p: TParams["products"]["getProducts"]
  ) => TResponses["products"]["getProducts"]
  getProduct: (
    p: TParams["products"]["getProduct"]
  ) => TResponses["products"]["getProduct"]
  getProductsPageList: (
    p: TParams["products"]["getProductsPageList"]
  ) => TResponses["products"]["getProductsPageList"]
  deleteProduct: (
    p: TParams["products"]["deleteProduct"]
  ) => TResponses["products"]["deleteProduct"]
  formBare: (
    p: TParams["products"]["formBare"]
  ) => TResponses["products"]["formBare"]
}

export const apiProducts: TApi["products"] = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  getProducts: getProducts,
  getProduct: getProduct,
  getProductsPageList: getProductsPageList,
  deleteProduct: deleteProduct,
  formBare: formBare,
}

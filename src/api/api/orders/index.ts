import { TApi } from "../../types"
import { service } from "../.."
import { AxiosError } from "axios"
import { TApi_Params_Orders as TParams } from "./params"
import { TApi_Responses_Orders as TResponses } from "./responses"
import { getApiError } from "../../../utils/helpers/api/getApiErrors"

const baseURL = "/orders"

export const createOrder: TApi["orders"]["createOrder"] = async ({
  newOrder,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newOrder)
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
                  "Não foi possível cadastrar o pedido. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível cadastrar o pedido. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível cadastrar o pedido. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const updateOrder: TApi["orders"]["updateOrder"] = async ({ order }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${order.id}`, order)
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
                  "Não foi possível atualizar o pedido. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível atualizar o pedido. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível atualizar o pedido. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getPageListOrders: TApi["orders"]["getPageListOrders"] = async (
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
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível listar os pedidos. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível listar os pedidos. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getOrders: TApi["orders"]["getOrders"] = async (filters) => {
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
                  "Não foi possível listar os pedidos. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível listar os pedidos. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível listar os pedidos. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const getOrder: TApi["orders"]["getOrder"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/${id}`)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: {
                order: info,
              },
            })
          } else {
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível obter as informações do pedido. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível obter as informações do pedido. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível obter as informações do pedido. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const deleteOrder: TApi["orders"]["getOrder"] = async ({ id }) => {
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
            resolve({
              ok: false,
              error: {
                message:
                  "Não foi possível excluir o pedido. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível excluir o pedido. Tente novamente mais tarde.",
            },
          })
        })
    } catch (error) {
      reject({
        error: {
          message:
            "Não foi possível excluir o pedido. Tente novamente mais tarde.",
        },
      })
    }
  })
}

export const formBare: TApi["orders"]["formBare"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`)
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
                  "Não foi possível receber as informações. Tente novamente mais tarde.",
              },
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: {
              message:
                "Não foi possível receber as informações. Tente novamente mais tarde.",
            },
          })
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

export type TApi_Orders = {
  createOrder: (
    p: TParams["orders"]["createOrder"]
  ) => TResponses["orders"]["createOrder"]
  updateOrder: (
    p: TParams["orders"]["updateOrder"]
  ) => TResponses["orders"]["updateOrder"]
  getPageListOrders: (
    p: TParams["orders"]["getPageListOrders"]
  ) => TResponses["orders"]["getPageListOrders"]
  getOrders: (
    p: TParams["orders"]["getOrders"]
  ) => TResponses["orders"]["getOrders"]
  getOrder: (
    p: TParams["orders"]["getOrder"]
  ) => TResponses["orders"]["getOrder"]
  deleteOrder: (
    p: TParams["orders"]["deleteOrder"]
  ) => TResponses["orders"]["deleteOrder"]
  formBare: (
    p: TParams["orders"]["formBare"]
  ) => TResponses["orders"]["formBare"]
}

export const apiOrders: TApi["orders"] = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  getPageListOrders: getPageListOrders,
  getOrders: getOrders,
  getOrder: getOrder,
  deleteOrder: deleteOrder,
  formBare: formBare,
}

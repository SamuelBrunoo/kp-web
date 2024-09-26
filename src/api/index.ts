import axios from "axios"
import { TApi } from "../utils/@types/api"
import { TDefaultBodyRes, TResData } from "../utils/@types/api/responses"
import { TBackResponse } from "../utils/@types/api/back"

axios.defaults.baseURL = process.env.REACT_APP_BACKURL

const initialResponse: TDefaultBodyRes<undefined> = {
  success: false,
  error: { message: "" },
}

const defaultErrors: {
  [type: string]: TDefaultBodyRes<undefined>
} = {
  connection: {
    success: false,
    error: {
      message: "Verifique a conexão e tente novamente",
    },
  },
}

const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    success: true,
    data: info,
  }
}

// --- API ---

// # New

const newProduct: TApi["new"]["product"] = async (nProd) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newProduct"]> = initialResponse

    try {
      const req = await axios.post<TBackResponse>(`/products`, nProd)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const newModel: TApi["new"]["model"] = async (nModel) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newModel"]> = initialResponse

    try {
      const req = await axios.post<TBackResponse>(`/models`, nModel)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const newClient: TApi["new"]["client"] = async (nClient) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newClient"]> = initialResponse

    try {
      const req = await axios.post<TBackResponse>(`/clients`, nClient)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const newRepresentative: TApi["new"]["representative"] = async (
  nRepresentative
) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newRepresentative"]> = initialResponse

    try {
      const req = await axios.post<TBackResponse>(
        `/representatives`,
        nRepresentative
      )

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const newOrder: TApi["new"]["order"] = async (nOrder) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newOrder"]> = initialResponse

    try {
      const req = await axios.post<TBackResponse>(`/orders`, nOrder)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

// # Update

const updateProduct: TApi["update"]["product"] = async (prod) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateProduct"]> = initialResponse

    try {
      const req = await axios.put<TBackResponse>(`/products/${prod.id}`, prod)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const updateModel: TApi["update"]["model"] = async (model) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateModel"]> = initialResponse

    try {
      const req = await axios.put<TBackResponse>(`/models/${model.id}`, model)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const updateClient: TApi["update"]["client"] = async (client) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateClient"]> = initialResponse

    try {
      const req = await axios.put<TBackResponse>(
        `/clients/${client.id}`,
        client
      )

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const updateRepresentative: TApi["update"]["representative"] = async (
  representative
) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateRepresentative"]> = initialResponse

    try {
      const req = await axios.put<TBackResponse>(
        `/representatives/${representative.id}`,
        representative
      )

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const updateOrder: TApi["update"]["order"] = async (order) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateOrder"]> = initialResponse

    try {
      const req = await axios.put<TBackResponse>(`/orders/${order.id}`, order)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

// # Getters

const getColors: TApi["get"]["colors"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["colors"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/colors`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getProductTypes: TApi["get"]["productTypes"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productTypes"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/productTypes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getProducts: TApi["get"]["products"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["products"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>("/products")

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getProduct: TApi["get"]["product"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["product"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/products/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getModels: TApi["get"]["models"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["models"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/models?pretty=yes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getModel: TApi["get"]["model"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["model"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/models/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getClients: TApi["get"]["clients"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["clients"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/clients?pretty=yes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getClient: TApi["get"]["client"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["client"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/clients/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getRepresentatives: TApi["get"]["representatives"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["representatives"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/representatives?pretty=yes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getRepresentative: TApi["get"]["representative"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["representative"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/representatives/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getOrders: TApi["get"]["orders"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["orders"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/orders?pretty=yes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getOrder: TApi["get"]["order"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["order"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/orders/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getProductionLines: TApi["get"]["productionLines"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productionLines"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/productionLines?pretty=yes`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getProductionLine: TApi["get"]["productionLine"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productionLine"]> = initialResponse

    try {
      const req = await axios.get<TBackResponse>(`/productionLines/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

// # Pages info
const getProductFormPageInfo: TApi["pageInfo"]["productForm"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["pageInfo"]["productForm"]> =
      initialResponse

    try {
      const prodTypesReq = await axios.get<TBackResponse>("/productTypes")
      const modelsReq = await axios.get<TBackResponse>("/models")
      const colorsReq = await axios.get<TBackResponse>("/colors")

      if (
        prodTypesReq.data.success &&
        modelsReq.data.success &&
        colorsReq.data.success
      ) {
        const prodTypes = prodTypesReq.data.data.list
        const models = modelsReq.data.data.list
        const colors = colorsReq.data.data.list

        res = generateResponse({
          prodTypes,
          models,
          colors,
        })
      } else
        res = {
          ...initialResponse,
          error: {
            message:
              "Houve um erro ao carregar os dados. Tente novamente mais tarde",
          },
        }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getOrderFormPageInfo: TApi["pageInfo"]["orderForm"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["pageInfo"]["orderForm"]> =
      initialResponse

    try {
      const req = await axios.get<TBackResponse>("/pageInfo/orderForm")

      if (req.data.success) {
        res = generateResponse(req.data.data)
      } else
        res = {
          ...initialResponse,
          error: {
            message:
              "Houve um erro ao carregar os dados. Tente novamente mais tarde",
          },
        }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const getModelsPageInfo: TApi["pageInfo"]["models"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["pageInfo"]["models"]> = initialResponse

    try {
      const prodTypesReq = await axios.get<TBackResponse>("/productTypes")
      const modelsReq = await axios.get<TBackResponse>("/models")

      if (prodTypesReq.data.success && modelsReq.data.success) {
        const prodTypes = prodTypesReq.data.data.list
        const models = modelsReq.data.data.list

        res = generateResponse({
          prodTypes,
          models,
        })
      } else
        res = {
          ...initialResponse,
          error: {
            message:
              "Houve um erro ao carregar os dados. Tente novamente mais tarde",
          },
        }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

// --- DELETES ---

const deleteProduct: TApi["delete"]["product"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteProduct"]> = initialResponse

    try {
      const req = await axios.delete<TBackResponse>(`/products/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const deleteModel: TApi["delete"]["model"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteModel"]> = initialResponse

    try {
      const req = await axios.delete<TBackResponse>(`/models/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const deleteClient: TApi["delete"]["client"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteClient"]> = initialResponse

    try {
      const req = await axios.delete<TBackResponse>(`/clients/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const deleteRepresentative: TApi["delete"]["representative"] = async ({
  id,
}) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteRepresentative"]> = initialResponse

    try {
      const req = await axios.delete<TBackResponse>(`/representatives/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

const deleteOrder: TApi["delete"]["order"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteOrder"]> = initialResponse

    try {
      const req = await axios.delete<TBackResponse>(`/orders/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

export const Api: TApi = {
  new: {
    product: newProduct,
    model: newModel,
    client: newClient,
    representative: newRepresentative,
    order: newOrder,
  },
  update: {
    product: updateProduct,
    model: updateModel,
    client: updateClient,
    representative: updateRepresentative,
    order: updateOrder,
  },
  get: {
    colors: getColors,
    products: getProducts,
    product: getProduct,
    productTypes: getProductTypes,
    models: getModels,
    model: getModel,
    clients: getClients,
    client: getClient,
    representatives: getRepresentatives,
    representative: getRepresentative,
    orders: getOrders,
    order: getOrder,
    productionLines: getProductionLines,
    productionLine: getProductionLine,
  },
  delete: {
    product: deleteProduct,
    model: deleteModel,
    client: deleteClient,
    representative: deleteRepresentative,
    order: deleteOrder,
  },
  pageInfo: {
    orderForm: getOrderFormPageInfo,
    productForm: getProductFormPageInfo,
    models: getModelsPageInfo,
  },
}

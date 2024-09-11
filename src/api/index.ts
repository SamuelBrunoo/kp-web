import axios from "axios"
import { TApi } from "../utils/@types/api"
import { TDefaultBodyRes, TResData } from "../utils/@types/api/responses"
import { TBackResponse } from "../utils/@types/api/back"

axios.defaults.baseURL = "http://localhost:8080/api"

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

export const Api: TApi = {
  new: {
    product: newProduct,
    model: newModel,
  },
  update: {
    product: updateProduct,
    model: updateModel,
  },
  get: {
    colors: getColors,
    products: getProducts,
    product: getProduct,
    productTypes: getProductTypes,
    models: getModels,
    model: getModel,
  },
  delete: {
    product: deleteProduct,
    model: deleteModel,
  },
  pageInfo: {
    productForm: getProductFormPageInfo,
    models: getModelsPageInfo,
  },
}

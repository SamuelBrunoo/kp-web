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

const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    success: true,
    data: info,
  }
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

export const Api: TApi = {
  get: {
    products: getProducts,
  },
  pageInfo: {
    productForm: getProductFormPageInfo,
  },
}

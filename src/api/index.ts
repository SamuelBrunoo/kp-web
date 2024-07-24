import axios from "axios"
import { TApi } from "../utils/@types/api"
import { TDefaultBodyRes, TResData } from "../utils/@types/api/responses"
import { TProduct } from "../utils/@types/data/product"
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

    const req = await axios.get<TBackResponse>("/products")

    try {
    } catch (error) {
      res = defaultErrors.connection as any
    }
    if (req.data.success) {
      const data = req.data.data

      res = generateResponse(data)
    } else res = { ...initialResponse, error: req.data.error }

    resolve(res)
  })
}

const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    success: true,
    data: info,
  }
}

export const Api: TApi = {
  get: {
    products: getProducts,
  },
}

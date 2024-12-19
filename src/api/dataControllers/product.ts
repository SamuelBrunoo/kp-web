import { generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"
import { getApiError } from "../../utils/helpers/api/getApiErrors"

export const newProduct: TApi["new"]["product"] = async (nProd) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newProduct"]> = initialResponse

    try {
      const req = await service.post<TBackResponse>(`/products`, nProd)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      const apiError = getApiError(error)
      res = apiError as any
    }

    resolve(res)
  })
}

export const updateProduct: TApi["update"]["product"] = async (prod) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateProduct"]> = initialResponse

    try {
      const req = await service.put<TBackResponse>(`/products/${prod.id}`, prod)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      const apiError = getApiError(error)
      res = apiError as any
    }

    resolve(res)
  })
}

export const getProducts: TApi["get"]["products"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["products"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>("/products")

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      const apiError = getApiError(error)
      res = apiError as any
    }

    resolve(res)
  })
}

export const getProduct: TApi["get"]["product"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["product"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/products/${id}`)

      if (req.data.success) {
        const data = req.data.data

        res = generateResponse(data)
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      const apiError = getApiError(error)
      res = apiError as any
    }

    resolve(res)
  })
}

export const getProductFormPageInfo: TApi["pageInfo"]["productForm"] =
  async () => {
    return new Promise(async (resolve) => {
      let res: TDefaultBodyRes<TResData["pageInfo"]["productForm"]> =
        initialResponse

      try {
        const prodTypesReq = await service.get<TBackResponse>("/productTypes")
        const modelsReq = await service.get<TBackResponse>("/models")
        const colorsReq = await service.get<TBackResponse>("/colors")

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
        const apiError = getApiError(error)
        res = apiError as any
      }

      resolve(res)
    })
  }

export const deleteProduct: TApi["delete"]["product"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteProduct"]> = initialResponse

    try {
      const req = await service.delete<TBackResponse>(`/products/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      const apiError = getApiError(error)
      res = apiError as any
    }

    resolve(res)
  })
}

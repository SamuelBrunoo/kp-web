import { isAxiosError } from "axios"
import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const newModel: TApi["new"]["model"] = async (nModel) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newModel"]> = initialResponse

    try {
      const req = await service.post<TBackResponse>(`/models`, nModel)

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

export const updateModel: TApi["update"]["model"] = async (model) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateModel"]> = initialResponse

    try {
      const req = await service.put<TBackResponse>(`/models/${model.id}`, model)

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

export const getModels: TApi["get"]["models"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["models"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/models?pretty=yes`)

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

export const getModel: TApi["get"]["model"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["model"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/models/${id}`)

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

export const getModelsPageInfo: TApi["pageInfo"]["models"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["pageInfo"]["models"]> = initialResponse

    try {
      const prodTypesReq = await service.get<TBackResponse>("/productTypes")
      const modelsReq = await service.get<TBackResponse>("/models")

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

export const deleteModel: TApi["delete"]["model"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteModel"]> = initialResponse

    try {
      const req = await service.delete<TBackResponse>(`/models/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.response?.status === 400) {
          const backError = error?.response?.data

          res = { ...initialResponse, error: { message: backError.error } }
        } else res = defaultErrors.connection as any
      } else res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

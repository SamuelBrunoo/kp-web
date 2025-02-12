import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const getProductionLines: TApi["get"]["productionLines"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productionLines"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(
        `/productionLines?pretty=yes`
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

export const getProductionLine: TApi["get"]["productionLine"] = async ({
  id,
}) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productionLine"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/productionLines/${id}`)

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

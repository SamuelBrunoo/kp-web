import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const getProductTypes: TApi["get"]["productTypes"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["productTypes"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/productTypes`)

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

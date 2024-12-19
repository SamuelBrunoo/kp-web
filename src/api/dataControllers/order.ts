import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const newOrder: TApi["new"]["order"] = async (nOrder) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newOrder"]> = initialResponse

    try {
      const req = await service.post<TBackResponse>(`/orders`, nOrder)

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

export const updateOrder: TApi["update"]["order"] = async (order) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateOrder"]> = initialResponse

    try {
      const req = await service.put<TBackResponse>(`/orders/${order.id}`, order)

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

export const getOrders: TApi["get"]["orders"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["orders"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/orders?pretty=yes`)

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

export const getOrder: TApi["get"]["order"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["order"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/orders/${id}`)

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

export const getOrderFormPageInfo: TApi["pageInfo"]["orderForm"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["pageInfo"]["orderForm"]> =
      initialResponse

    try {
      const req = await service.get<TBackResponse>("/pageInfo/orderForm")

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

export const deleteOrder: TApi["delete"]["order"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteOrder"]> = initialResponse

    try {
      const req = await service.delete<TBackResponse>(`/orders/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

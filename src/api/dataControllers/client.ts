import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const newClient: TApi["new"]["client"] = async (nClient) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newClient"]> = initialResponse

    try {
      const req = await service.post<TBackResponse>(`/clients`, nClient)

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

export const updateClient: TApi["update"]["client"] = async (client) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateClient"]> = initialResponse

    try {
      const req = await service.put<TBackResponse>(
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

export const getClients: TApi["get"]["clients"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["clients"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/clients?pretty=yes`)

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

export const getClient: TApi["get"]["client"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["client"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/clients/${id}`)

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

export const deleteClient: TApi["delete"]["client"] = async ({ id }) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteClient"]> = initialResponse

    try {
      const req = await service.delete<TBackResponse>(`/clients/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

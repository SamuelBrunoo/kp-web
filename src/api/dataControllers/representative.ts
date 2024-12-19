import { defaultErrors, generateResponse, initialResponse, service } from ".."
import { TApi } from "../../utils/@types/api"
import { TBackResponse } from "../../utils/@types/api/back"
import { TDefaultBodyRes, TResData } from "../../utils/@types/api/responses"

export const newRepresentative: TApi["new"]["representative"] = async (
  nRepresentative
) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["newRepresentative"]> = initialResponse

    try {
      const req = await service.post<TBackResponse>(
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

export const updateRepresentative: TApi["update"]["representative"] = async (
  representative
) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["updateRepresentative"]> = initialResponse

    try {
      const req = await service.put<TBackResponse>(
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

export const getRepresentatives: TApi["get"]["representatives"] = async () => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["representatives"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(
        `/representatives?pretty=yes`
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

export const getRepresentative: TApi["get"]["representative"] = async ({
  id,
}) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["representative"]> = initialResponse

    try {
      const req = await service.get<TBackResponse>(`/representatives/${id}`)

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

export const deleteRepresentative: TApi["delete"]["representative"] = async ({
  id,
}) => {
  return new Promise(async (resolve) => {
    let res: TDefaultBodyRes<TResData["deleteRepresentative"]> = initialResponse

    try {
      const req = await service.delete<TBackResponse>(`/representatives/${id}`)

      if (req.data.success) {
        res = generateResponse({})
      } else res = { ...initialResponse, error: req.data.error }
    } catch (error) {
      res = defaultErrors.connection as any
    }

    resolve(res)
  })
}

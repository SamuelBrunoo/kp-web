import axios, { AxiosError, AxiosResponse } from "axios"
import { defaultErrors } from "../../../api"

export const getApiError = (data: AxiosResponse | AxiosError) => {
  try {
    if (axios.isAxiosError(data) && data.response?.status === 400) {
      const backData = data.response?.data as any

      return {
        success: false,
        error: {
          message: backData.error,
        },
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    return defaultErrors.connection
  }
}

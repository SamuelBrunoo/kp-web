import { TUser } from "../../../utils/@types/data/user"
import { TDefaultRes } from "../../types/responses"

export type TApi_Responses_Auth = {
  auth: {
    login: Promise<
      TDefaultRes<{
        accessToken: string
        refreshToken: string
        user: TUser
      }>
    >
    refreshToken: Promise<
      TDefaultRes<{
        accessToken: string
        refreshToken: string
        user: TUser
      }>
    >
  }
}

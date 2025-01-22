import { TDefaultRes } from "../../types/responses"
import { TClient } from "../../../utils/@types/data/client"

export type TApi_Responses_Clients = {
  clients: {
    createClient: Promise<
      TDefaultRes<{
        client: TClient
      }>
    >
    updateClient: Promise<
      TDefaultRes<{
        client: TClient
      }>
    >
    getClients: Promise<
      TDefaultRes<{
        list: TClient[]
      }>
    >
    getClient: Promise<TDefaultRes<TClient>>
    deleteClient: Promise<TDefaultRes<{}>>
  }
}

import { TDefaultRes } from "../../types/responses"
import { TClient, TPageListClient } from "../../../utils/@types/data/client"

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
    getClientsListPage: Promise<
      TDefaultRes<{
        list: TPageListClient[]
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

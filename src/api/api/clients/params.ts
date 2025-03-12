import { TClient, TNewClient } from "../../../utils/@types/data/client"

export type TApi_Params_Clients = {
  clients: {
    createClient: { newClient: TNewClient }
    updateClient: { client: TClient }
    getClientsListPage: {}
    getClients: {}
    getClient: { id: string }
    deleteClient: { id: string }
  }
}

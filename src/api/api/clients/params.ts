import { TNewClient } from "../../../utils/@types/data/client"

export type TApi_Params_Clients = {
  clients: {
    createClient: { newClient: TNewClient }
    updateClient: { client: TNewClient }
    getClients: {}
    getClient: { id: string }
    deleteClient: { id: string }
  }
}

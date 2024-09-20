import { TParams } from "./params"
import { TResponses } from "./responses"

export type TApi = {
  new: {
    product: (p: TParams["new"]["product"]) => TResponses["new"]["product"]
    model: (p: TParams["new"]["model"]) => TResponses["new"]["model"]
    client: (p: TParams["new"]["client"]) => TResponses["new"]["client"]
    representative: (
      p: TParams["new"]["representative"]
    ) => TResponses["new"]["representative"]
    order: (p: TParams["new"]["order"]) => TResponses["new"]["order"]
  }
  update: {
    product: (
      p: TParams["update"]["product"]
    ) => TResponses["update"]["product"]
    model: (p: TParams["update"]["model"]) => TResponses["update"]["model"]
    client: (p: TParams["update"]["client"]) => TResponses["update"]["client"]
    representative: (
      p: TParams["update"]["representative"]
    ) => TResponses["update"]["representative"]
    order: (p: TParams["update"]["order"]) => TResponses["update"]["order"]
  }
  get: {
    colors: (p: TParams["get"]["colors"]) => TResponses["get"]["colors"]
    products: (p: TParams["get"]["products"]) => TResponses["get"]["products"]
    product: (p: TParams["get"]["product"]) => TResponses["get"]["product"]
    productTypes: (
      p: TParams["get"]["productTypes"]
    ) => TResponses["get"]["productTypes"]
    models: (p: TParams["get"]["models"]) => TResponses["get"]["models"]
    model: (p: TParams["get"]["model"]) => TResponses["get"]["model"]
    clients: (p: TParams["get"]["clients"]) => TResponses["get"]["clients"]
    client: (p: TParams["get"]["client"]) => TResponses["get"]["client"]
    representatives: (
      p: TParams["get"]["representatives"]
    ) => TResponses["get"]["representatives"]
    representative: (
      p: TParams["get"]["representative"]
    ) => TResponses["get"]["representative"]
    orders: (p: TParams["get"]["orders"]) => TResponses["get"]["orders"]
    order: (p: TParams["get"]["order"]) => TResponses["get"]["order"]
  }
  delete: {
    product: (
      p: TParams["delete"]["product"]
    ) => TResponses["delete"]["product"]
    model: (p: TParams["delete"]["model"]) => TResponses["delete"]["model"]
    client: (p: TParams["delete"]["client"]) => TResponses["delete"]["client"]
    representative: (
      p: TParams["delete"]["representative"]
    ) => TResponses["delete"]["representative"]
    order: (p: TParams["delete"]["order"]) => TResponses["delete"]["order"]
  }
  pageInfo: {
    productForm: (
      p: TParams["pageInfo"]["productForm"]
    ) => TResponses["pageInfo"]["productForm"]
    orderForm: (
      p: TParams["pageInfo"]["orderForm"]
    ) => TResponses["pageInfo"]["orderForm"]
    models: (
      p: TParams["pageInfo"]["models"]
    ) => TResponses["pageInfo"]["models"]
  }
}

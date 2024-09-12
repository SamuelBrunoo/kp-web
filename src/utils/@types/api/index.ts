import { TParams } from "./params"
import { TResponses } from "./responses"

export type TApi = {
  new: {
    product: (p: TParams["new"]["product"]) => TResponses["new"]["product"]
    model: (p: TParams["new"]["model"]) => TResponses["new"]["model"]
    client: (p: TParams["new"]["client"]) => TResponses["new"]["client"]
  }
  update: {
    product: (
      p: TParams["update"]["product"]
    ) => TResponses["update"]["product"]
    model: (p: TParams["update"]["model"]) => TResponses["update"]["model"]
    client: (p: TParams["update"]["client"]) => TResponses["update"]["client"]
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
  }
  delete: {
    product: (
      p: TParams["delete"]["product"]
    ) => TResponses["delete"]["product"]
    model: (p: TParams["delete"]["model"]) => TResponses["delete"]["model"]
    client: (p: TParams["delete"]["client"]) => TResponses["delete"]["client"]
  }
  pageInfo: {
    productForm: (
      p: TParams["pageInfo"]["productForm"]
    ) => TResponses["pageInfo"]["productForm"]
    models: (
      p: TParams["pageInfo"]["models"]
    ) => TResponses["pageInfo"]["models"]
  }
}

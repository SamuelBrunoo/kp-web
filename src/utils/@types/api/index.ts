import { TParams } from "./params"
import { TResponses } from "./responses"

export type TApi = {
  get: {
    products: (p: TParams["get"]["products"]) => TResponses["get"]["products"]
  }
}

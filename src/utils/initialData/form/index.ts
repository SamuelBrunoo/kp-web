import { initialClient } from "./client"
import { initialModel } from "./model"
import { initialOrder } from "./order"
import { initialProduct } from "./product"
import { initialRepresentative } from "./representative"

export const initialForm = {
  product: initialProduct,
  order: initialOrder,
  model: initialModel,
  client: initialClient,
  representative: initialRepresentative,
}

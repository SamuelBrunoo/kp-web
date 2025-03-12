import { TDefaultRes } from "../../types/responses"
import { TColor } from "../../../utils/@types/data/color"
import { TModelDetails } from "../../../utils/@types/data/model"
import { TProductType } from "../../../utils/@types/data/productType"
import { TProduct } from "../../../utils/@types/data/product"
import { TOrder } from "../../../utils/@types/data/order"
import { TClient } from "../../../utils/@types/data/client"
import { TRepresentative } from "../../../utils/@types/data/representative"
import { TState } from "../../../utils/@types/data/address"

export type TApi_Responses_FormBare = {
  formBare: {
    model: Promise<
      TDefaultRes<{
        colors: TColor[]
        prodTypes: TProductType[]
        products: TProduct
        orders: TOrder
        model?: TModelDetails
      }>
    >
    client: Promise<
      TDefaultRes<{
        representatives: TRepresentative[]
        states: TState[]
        client?: TClient
      }>
    >
  }
}

import { TApi_Clients } from "../api/clients"
import { TApi_Colors } from "../api/colors"
import { TApi_Models } from "../api/models"
import { TApi_Orders } from "../api/orders"
import { TApi_ProductionLines } from "../api/productLine.ts"
import { TApi_Products } from "../api/products"
import { TApi_ProductTypes } from "../api/productTypes"
import { TApi_Representatives } from "../api/representative"

export type TApi = {
  clients: TApi_Clients
  colors: TApi_Colors
  models: TApi_Models
  orders: TApi_Orders
  products: TApi_Products
  productTypes: TApi_ProductTypes
  productionLines: TApi_ProductionLines
  representatives: TApi_Representatives
}

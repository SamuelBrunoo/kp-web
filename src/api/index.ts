import axios from "axios"
import { TApi } from "../utils/@types/api"
import { TDefaultBodyRes, TErrorResponse } from "../utils/@types/api/responses"

// Controllers
import * as ClientController from "./dataControllers/client"
import * as ColorController from "./dataControllers/colors"
import * as ModelController from "./dataControllers/model"
import * as OrderController from "./dataControllers/order"
import * as ProductController from "./dataControllers/product"
import * as ProductLineController from "./dataControllers/productLine"
import * as ProductTypeController from "./dataControllers/productType"
import * as RepresentativeController from "./dataControllers/representative"

axios.defaults.baseURL = process.env.REACT_APP_BACKURL

export const initialResponse: TErrorResponse = {
  success: false,
  error: { message: "" },
}

export const defaultErrors: {
  [type: string]: TDefaultBodyRes<undefined>
} = {
  connection: {
    success: false,
    error: {
      message: "Verifique a conexão e tente novamente",
    },
  },
}

export const generateResponse = <T>(info: any): TDefaultBodyRes<T> => {
  return {
    success: true,
    data: info,
  }
}

export const service = axios

// --- API ---

export const Api: TApi = {
  new: {
    product: ProductController.newProduct,
    model: ModelController.newModel,
    client: ClientController.newClient,
    representative: RepresentativeController.newRepresentative,
    order: OrderController.newOrder,
  },
  update: {
    product: ProductController.updateProduct,
    model: ModelController.updateModel,
    client: ClientController.updateClient,
    representative: RepresentativeController.updateRepresentative,
    order: OrderController.updateOrder,
  },
  get: {
    colors: ColorController.getColors,
    products: ProductController.getProducts,
    product: ProductController.getProduct,
    productTypes: ProductTypeController.getProductTypes,
    models: ModelController.getModels,
    model: ModelController.getModel,
    clients: ClientController.getClients,
    client: ClientController.getClient,
    representatives: RepresentativeController.getRepresentatives,
    representative: RepresentativeController.getRepresentative,
    orders: OrderController.getOrders,
    order: OrderController.getOrder,
    productionLines: ProductLineController.getProductionLines,
    productionLine: ProductLineController.getProductionLine,
  },
  delete: {
    product: ProductController.deleteProduct,
    model: ModelController.deleteModel,
    client: ClientController.deleteClient,
    representative: RepresentativeController.deleteRepresentative,
    order: OrderController.deleteOrder,
  },
  pageInfo: {
    orderForm: OrderController.getOrderFormPageInfo,
    productForm: ProductController.getProductFormPageInfo,
    models: ModelController.getModelsPageInfo,
  },
}

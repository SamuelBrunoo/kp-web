import parseClients from "./parseClients"
import parseManufaturing from "./parseManufacturing"
import parseOrders from "./parseOrders"

type TContent = "models" | "products" | "clients" | "orders" | "manufacturing"

export const parseTableData = (
  data: any[],
  contentType: TContent,
  extra?: any
) => {
  let list: any[] = []

  switch (contentType) {
    case "clients":
      list = parseClients(data)
      break
    case "manufacturing":
      list = parseManufaturing(data)
      break
    case "orders":
      list = parseOrders(data)
      break
    default:
      list = data
      break
  }

  return list
}

import Input from "../../component/Inpts"
import StatusIndicator from "../../component/StatusIndicator"
import TableActions from "../../component/Table/TableActions"
import { TClient } from "../@types/data/client"
import { TModel } from "../@types/data/model"
import { TOrder } from "../@types/data/order"
import { TProduct } from "../@types/data/product"
import { TProductionLine } from "../@types/data/productionLine"
import { formatCep } from "../helpers/formatters/cep"
import { formatCnpj } from "../helpers/formatters/cnpj"
import { formatCpf } from "../helpers/formatters/cpf"
import { parseDate } from "../helpers/formatters/date"
import { formatMoney } from "../helpers/formatters/money"
import { getStatus } from "../helpers/parsers/getStatus"

type TTableConfigs =
  | "colors"
  | "products"
  | "models"
  | "modelVariations"
  | "clients"
  | "orders"
  | "orderDetailsProducts"
  | "orderFormProducts"
  | "productionLines"
  | "productProductionGroup"
  | "productProduction"

export const tableConfig: {
  [key in TTableConfigs]: TConfig
} = {
  colors: {
    columns: [
      { title: "Cor", field: "name" },
      { title: "Permite", field: "allow" },
    ],
    specialFields: {
      allow: (item: any, onChange: (colorCode: string) => void) => (
        <Input.ColorCheckbox
          checked={item.checked}
          onChange={() => onChange(item.code)}
        />
      ),
    },
  },
  products: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Código", field: "code" },
      { title: "Cor", field: "color" },
      { title: "Preço", field: "price" },
      { title: "Estoque", field: "storage", align: "center" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      storage: (item: TProduct) =>
        item.storage.has ? item.storage.quantity : "Não possui",
      price: (item: TProduct) => formatMoney(item.price),
      actions: (item: TProduct, deleteCallback) => (
        <TableActions
          table={"products"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
  },
  models: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Nome", field: "name" },
      { title: "Código", field: "code" },
      { title: "Cores", field: "colors", align: "center" },
      { title: "Estoque", field: "storage", align: "center" },
      { title: "Preço", field: "price" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      colors: (item: TModel) => item.colors.length,
      storage: (item: TModel) =>
        item.storage.has ? item.storage.quantity : "Não possui",
      price: (item: TModel) => formatMoney(item.price),
      actions: (item: TModel, deleteCallback) => (
        <TableActions
          table={"models"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
  },
  modelVariations: {
    columns: [
      { title: "Código", field: "code" },
      { title: "Cor", field: "color" },
      { title: "Estoque", field: "storage", align: "center" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      storage: (item: TModel) =>
        item.storage.has ? item.storage.quantity : "Não possui",
      price: (item: TModel) => formatMoney(item.price),
      actions: (item: TModel) => (
        <TableActions table={"modelVariations"} id={item.id} />
      ),
    },
  },
  clients: {
    columns: [
      { title: "Cliente", field: "name" },
      { title: "Razão social", field: "socialRole" },
      { title: "CPF / CNPJ", field: "cpfCnpj" },
      { title: "Endereço", field: "address" },
      { title: "CEP", field: "cep" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      socialRole: (item: TClient) => item.socialRole ?? "-",
      address: (item: TClient) => item.address.full,
      cpfCnpj: (item: TClient) =>
        item.cpf ? formatCpf(item.cpf) : formatCnpj(item.cnpj ?? ""),
      cep: (item: TClient) => formatCep(item.address.cep),
      actions: (item: TClient, deleteCallback) => (
        <TableActions
          table={"clients"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
    isExpandable: true,
  },
  orders: {
    columns: [
      { title: "Nº", field: "code" },
      { title: "Cliente", field: "clientName" },
      { title: "Data do pedido", field: "orderDate" },
      { title: "Valor", field: "value" },
      { title: "Status", field: "status", align: "center" },
      { title: "Controle", field: "actions", align: "center" },
    ],
    specialFields: {
      clientName: (item: TOrder) => item.client.name,
      orderDate: (item: TOrder) => parseDate(item.orderDate, "str"),
      value: (item: TOrder) => formatMoney(item.value),
      status: (item: TOrder) => getStatus("resume", item.status as any),
      actions: (item: TOrder, deleteCallback) => (
        <TableActions
          table={"orders"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
    isExpandable: true,
  },
  orderDetailsProducts: {
    columns: [
      { title: "Modelo", field: "model" },
      { title: "Cor / Variação", field: "color" },
      { title: "Código", field: "code" },
      { title: "Qnt", field: "quantity", align: "center" },
      { title: "Valor Un.", field: "unitary" },
      { title: "Valor Total", field: "total" },
      { title: "Status", field: "status", align: "center", width: "152px" },
    ],
    specialFields: {
      model: (item: TOrder["products"][number]) => item.model,
      color: (item: TOrder["products"][number]) => item.color,
      unitary: (item: TOrder["products"][number]) => formatMoney(item.price),
      status: (item: TOrder["products"][number]) => (
        <StatusIndicator status={item.status} />
      ),
      total: (item: TOrder["products"][number]) =>
        formatMoney(item.price * item.quantity),
      actions: (item: TOrder["products"][number], deleteCallback) => (
        <TableActions
          table={"orders"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
    isExpandable: true,
  },
  orderFormProducts: {
    columns: [
      { title: "Modelo", field: "model" },
      { title: "Cor", field: "color" },
      { title: "Código", field: "code" },
      { title: "Qnt", field: "quantity", align: "center" },
      { title: "Valor Un.", field: "unitary" },
      { title: "Valor Total", field: "total" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      model: (item: TOrder["products"][number]) => item.model,
      color: (item: TOrder["products"][number]) => item.color,
      unitary: (item: TOrder["products"][number]) => formatMoney(item.price),
      total: (item: TOrder["products"][number]) =>
        formatMoney(item.price * item.quantity),
      actions: (item: TOrder["products"][number], deleteCallback) => (
        <TableActions
          table={"orderFormProduct"}
          id={item.id}
          deleteCallback={deleteCallback}
          noEdit={true}
        />
      ),
    },
    isExpandable: true,
  },
  productionLines: {
    columns: [
      { title: "Pedido", field: "orderCode" },
      { title: "Cliente", field: "clientName" },
      { title: "Data do pedido", field: "orderDate" },
      { title: "Prazo de entrega", field: "deadline" },
      { title: "Produzindo", field: "quantity", align: "center" },
      { title: "Status", field: "status", align: "center", width: "152px" },
    ],
    specialFields: {
      orderCode: (item: TProductionLine) => item.order.code,
      clientName: (item: TProductionLine) =>
        item.order.client.name ?? item.order.client.socialRole,
      orderDate: (item: TProductionLine) =>
        parseDate(item.order.orderDate, "str"),
      deadline: (item: TProductionLine) =>
        parseDate(item.order.deadline, "str"),
      status: (item: TProductionLine) => (
        <StatusIndicator status={item.status} />
      ),
    },
    isExpandable: true,
  },
  productProductionGroup: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Cor/Variação", field: "color" },
      { title: "Qnt", field: "quantity", align: "center" },
      { title: "Status", field: "status", align: "center", width: "152px" },
    ],
    specialFields: {
      quantity: (item: TProductionLine["products"][number]) => item.list.length,
      status: (item: TProductionLine["products"][number]) => (
        <StatusIndicator status={item.status} />
      ),
    },
    isExpandable: true,
  },
  productProduction: {
    columns: [
      { title: "Nº", field: "productIndex" },
      { title: "Responsável", field: "inCharge" },
      { title: "Status", field: "status", align: "center", width: "152px" },
    ],
    specialFields: {
      productIndex: (
        item: TProductionLine["products"][number]["list"][number]
      ) => String(item.index).padStart(3, "0"),
      inCharge: (item: TProductionLine["products"][number]["list"][number]) =>
        item.inCharge.name ?? "Não atribuído",
      status: (item: TProductionLine["products"][number]["list"][number]) => (
        <StatusIndicator status={item.status} />
      ),
    },
  },
}

type TColumn = {
  title: string
  field: string
  size?: string | number
  align?: "left" | "center" | "right"
  width?: string
}

export type TConfig = {
  columns: TColumn[]
  specialFields: {
    [key: string]: (item: any, prop2?: any) => any
  }
  isExpandable?: boolean
}

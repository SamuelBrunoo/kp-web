import { Switch } from "@mui/material"
import Input from "../../components/Inpts"
import StatusIndicator from "../../components/StatusIndicator"
import TableActions from "../../components/Table/TableActions"
import { TPageListClient } from "../@types/data/client"
import { TColor } from "../@types/data/color"
import { TModel, TPageListModel } from "../@types/data/model"
import { TOrder, TPageListOrder } from "../@types/data/order"
import { TPageListProduct, TProduct } from "../@types/data/product"
import { TProductionLine } from "../@types/data/productionLine"
import { formatCep } from "../helpers/formatters/cep"
import { formatCnpj } from "../helpers/formatters/cnpj"
import { formatCpf } from "../helpers/formatters/cpf"
import { parseDate } from "../helpers/formatters/date"
import { formatMoney } from "../helpers/formatters/money"
import { TProductType } from "../@types/data/productType"

import { theme } from "../../theme"

type TTableConfigs =
  | "colors"
  | "products"
  | "models"
  | "modelVariations"
  | "clients"
  | "orders"
  | "orderDetailsProducts"
  | "orderFormProducts"
  | "orderFormSlips"
  | "productionLines"
  | "productProductionGroup"
  | "productProduction"

export const tableConfig: {
  [key in TTableConfigs]: TConfig
} = {
  colors: {
    columns: [
      { title: "Cor", field: "name" },
      { title: "Permite", field: "allow", align: "center" },
    ],
    specialFields: {
      allow: (item: TColor & { checked: boolean }, { callbacks }) => (
        <div style={{ margin: "auto", width: "fit-content", maxWidth: 420 }}>
          <Input.ColorCheckbox
            checked={item.checked}
            onChange={() => callbacks.toggleColor(item.code)}
          />
        </div>
      ),
    },
  },
  products: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Código", field: "code" },
      { title: "Cor", field: "color" },
      { title: "Estoque", field: "storage", align: "center" },
      { title: "Preço base", field: "price" },
      { title: "Status", field: "status" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      storage: (item: TProduct) => item.storage,
      price: (item: TProduct) => formatMoney(item.price),
      status: (item: TProduct) => (
        <Switch
          checked={item.active}
          sx={{
            "&:has(.Mui-checked) .MuiSwitch-track": {
              backgroundColor: (theme) =>
                `${theme.palette.green[460]} !important`,
            },
            "& .Mui-checked .MuiSwitch-thumb": {
              backgroundColor: (theme) => theme.palette.green[500],
              "&:hover": {
                boxShadow: "none",
              },
            },
            "&:hover": {
              ".Mui-checked": {
                backgroundColor: "transparent",
              },
              input: {
                cursor: "default",
              },
            },
            pointerEvents: "none",
          }}
        />
      ),
      actions: (item: TPageListProduct, { callbacks }) => (
        <TableActions
          table={"products"}
          id={item.id}
          deleteCallback={callbacks.deleteCallback}
          canDelete={item.deletable}
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
      { title: "Preço Base", field: "price" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      storage: (item: TModel) =>
        item.storage.has ? item.storage.quantity : "Não possui",
      price: (item: TModel) => formatMoney(item.price),
      actions: (item: TPageListModel, { callbacks }) => (
        <TableActions
          table={"models"}
          id={item.id}
          deleteCallback={callbacks.deleteCallback}
          canDelete={item.deletable}
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
      { title: "Razão social", field: "socialRole" },
      { title: "Nome do cliente", field: "name" },
      { title: "CPF / CNPJ", field: "cpfCnpj" },
      { title: "Endereço", field: "address" },
      { title: "CEP", field: "cep" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      address: (item: TPageListClient) => item.address.full,
      cpfCnpj: (item: TPageListClient) =>
        item.type === "physical"
          ? formatCpf(item.document)
          : formatCnpj(item.document),
      cep: (item: TPageListClient) => formatCep(item.cep),
      actions: (item: TPageListClient, { callbacks }) => (
        <TableActions
          table={"clients"}
          id={item.id}
          canDelete={item.deletable}
          deleteCallback={callbacks.deleteCallback}
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
      { title: "Quantidade", field: "quantity", align: "center" },
    ],
    specialFields: {
      value: (item: TPageListOrder) => formatMoney(item.value),
      quantity: (item: TPageListOrder) => item.quantity,
      // status: (item: TPageListOrder) => getStatus("resume", item.status as any),
      // actions: (item: TPageListOrder, { callbacks }) => (
      //   <TableActions
      //     table={"orders"}
      //     id={item.id}
      //     deleteCallback={callbacks.deleteCallback}
      //   />
      // ),
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
        <StatusIndicator status={item.status} onChange={() => {}} />
      ),
      total: (item: TOrder["products"][number]) =>
        formatMoney(item.price * item.quantity),
      actions: (item: TOrder["products"][number], { callbacks }) => (
        <TableActions
          table={"orders"}
          id={item.id}
          deleteCallback={callbacks.deleteCallback}
        />
      ),
    },
    isExpandable: true,
  },
  orderFormProducts: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Cor", field: "color" },
      { title: "Código", field: "code" },
      { title: "Qnt", field: "quantity", align: "center" },
      { title: "Preço Un.", field: "unitary" },
      { title: "Preço Total", field: "total" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      type: (item: TOrder["products"][number], { extra }) =>
        (extra.productTypes as TProductType[]).find(
          (pt) => pt.code === item.type
        )?.name,
      model: (item: TOrder["products"][number]) => item.model,
      color: (item: TOrder["products"][number]) => item.color,
      unitary: (item: TOrder["products"][number]) => formatMoney(item.price),
      total: (item: TOrder["products"][number]) =>
        formatMoney(item.price * item.quantity),
      actions: (item: TOrder["products"][number], { callbacks }) => (
        <TableActions
          table={"orderFormProduct"}
          id={item.id}
          deleteCallback={callbacks.deleteCallback}
          canDelete={true}
          noEdit={true}
        />
      ),
    },
    isExpandable: true,
  },
  orderFormSlips: {
    columns: [
      { title: "Parcela", field: "installment" },
      { title: "Valor", field: "value" },
      { title: "Vencimento", field: "due" },
      { title: "Código de barras", field: "code" },
      { title: "Total pago", field: "paidTotal", align: "center" },
      { title: "Preço Total", field: "totalPrice" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      actions: (item: TOrder["payment"], { callbacks, extra }) =>
        Object.keys(callbacks).length > 0 ? (
          <TableActions
            table={"orderFormProduct"}
            id={extra.listIndex}
            deleteCallback={callbacks.deleteCallback}
            canDelete={true}
            noEdit={true}
          />
        ) : null,
    },
    itemColor: theme.colors.neutral[600],
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
    [key: string]: (
      item: any,
      info: {
        data?: any
        callbacks: {
          [key: string]: (...params: any[]) => void | Promise<void>
        }
        extra?: any
      }
    ) => any
  }
  isExpandable?: boolean
  itemColor?: string
}

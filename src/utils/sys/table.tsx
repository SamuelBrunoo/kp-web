import { Switch } from "@mui/material"
import Input from "../../components/Inpts"
import StatusIndicator from "../../components/StatusIndicator"
import TableActions from "../../components/Table/TableActions"
import { TClient, TPageListClient } from "../@types/data/client"
import { TColor } from "../@types/data/color"
import { TModel, TPageListModel } from "../@types/data/model"
import { TOPStatus, TOrder, TPageListOrder } from "../@types/data/order"
import { TPageListProduct, TProduct } from "../@types/data/product"
import {
  TPageListProductionLine,
  TProductionLine,
} from "../@types/data/productionLine"
import { formatCep } from "../helpers/formatters/cep"
import { formatCnpj } from "../helpers/formatters/cnpj"
import { formatCpf } from "../helpers/formatters/cpf"
import { formatMoney } from "../helpers/formatters/money"
import { TProductType } from "../@types/data/productType"

import ResponsableIndicator from "../../components/ResponsableIndicator"

import * as dateFns from "date-fns"

import { theme } from "../../theme"
import { TPageListRepresentative } from "../@types/data/representative"

type TTableConfigs =
  | "colors"
  | "products"
  | "models"
  | "modelVariations"
  | "clients"
  | "representativeClients"
  | "representatives"
  | "orders"
  | "orderDetailsProducts"
  | "orderFormProducts"
  | "orderFormSlips"
  | "productionLines"
  | "productProductionGroup"
  | "productionLineProductList"
  | "productionLineAttributions"

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
      { title: "Status", field: "statusIndicator" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      storage: (item: TProduct) => item.storage,
      price: (item: TProduct) => formatMoney(item.price),
      statusIndicator: (item: TProduct) => (
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
  representativeClients: {
    columns: [
      { title: "Nome do cliente", field: "clientName" },
      { title: "CPF / CNPJ", field: "cpfCnpj" },
      { title: "Endereço", field: "address" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      cpfCnpj: (item: TClient) =>
        item.type === "physical"
          ? formatCpf(item.documents.register)
          : formatCnpj(item.documents.register),
      address: (item: TClient) => item.address.full,
      actions: (item: TClient) => (
        <TableActions
          table={"representativeClients"}
          id={item.id}
          noDelete={true}
          noEdit={true}
        />
      ),
    },
    isExpandable: true,
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
  representatives: {
    columns: [
      { title: "Nome", field: "name" },
      { title: "Clientes", field: "clients", align: "center" },
      { title: "Total mês", field: "monthTotal" },
      { title: "Vendas no mês", field: "monthSells", align: "center" },
      { title: "Vendas no ano", field: "yearSells", align: "center" },
      { title: "Total ano", field: "yearTotal" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      monthTotal: (item: TPageListRepresentative) =>
        formatMoney(item.monthTotal),
      yearTotal: (item: TPageListRepresentative) => formatMoney(item.yearTotal),
      actions: (item: TPageListRepresentative, { callbacks }) => (
        <TableActions
          table={"representatives"}
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
      { title: "Valor", field: "value", hideOn: ["small"] },
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
      { title: "Cor", field: "color" },
      { title: "Código", field: "code", hideOn: ["small"] },
      { title: "Qnt", field: "quantity", align: "center" },
      { title: "Valor Un.", field: "unitary", hideOn: ["small"] },
      { title: "Valor Total", field: "total", hideOn: ["small"] },
      {
        title: "Status",
        field: "statusIndicator",
        align: "center",
        width: "152px",
      },
    ],
    specialFields: {
      model: (item: TOrder["products"][number]) => item.model,
      color: (item: TOrder["products"][number]) => item.color,
      unitary: (item: TOrder["products"][number]) => formatMoney(item.price),
      statusIndicator: (item: TOrder["products"][number]) => (
        <StatusIndicator
          status={item.status}
          onChange={() => {}}
          shouldHideOptions={true}
        />
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
          customDelete={true}
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
      { title: "Produzindo", field: "onProduction", align: "center" },
      {
        title: "Status",
        field: "statusIndicator",
        align: "center",
        width: "152px",
      },
    ],
    specialFields: {
      statusIndicator: (item: TPageListProductionLine["order"]) => (
        <div style={{ margin: "auto", width: "fit-content" }}>
          <StatusIndicator status={item.status} shouldHideOptions={true} />
        </div>
      ),
    },
    isExpandable: true,
  },
  productProductionGroup: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Qnt", field: "quantity", align: "center" },
      {
        title: "Status",
        field: "statusIndicator",
        align: "center",
        hideOn: ["small"],
      },
    ],
    specialFields: {
      statusIndicator: (item: TProductionLine["products"][number]) => (
        <StatusIndicator
          status={item.status}
          shouldHideOptions={true}
          onChange={() => {}}
        />
      ),
    },
    isExpandable: true,
    isDropable: true,
  },
  productionLineProductList: {
    columns: [
      { title: "Nº", field: "lineNumber", width: "30%" },
      { title: "Cor", field: "color" },
      { title: "Código", field: "code", align: "center" },
    ],
    specialFields: {
      lineNumber: (item: any) => String(item.lineNumber).padStart(3, "0"),
    },
  },
  productionLineAttributions: {
    columns: [
      { title: "Nº", field: "number" },
      {
        title: "Responsável",
        field: "inCharge",
        align: "center",
        width: "152px",
      },
      { title: "Modelo", field: "model" },
      { title: "Cor", field: "color" },
      { title: "Código", field: "code" },
      {
        title: "Status",
        field: "statusIndicator",
        align: "center",
        width: "152px",
      },
      { title: "Atribuído em", field: "attributedAt", align: "center" },
    ],
    specialFields: {
      number: (
        item: TPageListProductionLine["order"]["details"]["attributions"][number]
      ) => String(item.number).padStart(3, "0"),
      inCharge: (
        item: TPageListProductionLine["order"]["details"]["attributions"][number],
        { callbacks, extra }
      ) => (
        <ResponsableIndicator
          value={!item.responsable ? null : item.responsable.id}
          options={extra.responsableList}
          onChange={(newResponsable: string) =>
            callbacks.onChangeResponsable(item.number, newResponsable)
          }
        />
      ),
      statusIndicator: (
        item: TPageListProductionLine["order"]["details"]["attributions"][number],
        { callbacks }
      ) =>
        item.status ? (
          <StatusIndicator
            status={item.status}
            onChange={(newStatus: TOPStatus) =>
              callbacks.onChangeStatus(item.number, newStatus)
            }
          />
        ) : (
          "Não atribuído"
        ),
      attributedAt: (
        item: TPageListProductionLine["order"]["details"]["attributions"][number]
      ) =>
        item.attributedAt
          ? typeof item.attributedAt === "number"
            ? dateFns.format(item.attributedAt, "dd/MM/yyyy")
            : item.attributedAt
          : "Não atribuído",
    },
  },
}

type TColumn = {
  title: string
  field: string
  size?: string | number
  align?: "left" | "center" | "right"
  width?: string
  hideOn?: TTableColHideConfig[]
}

type TTableColHideConfig = keyof typeof theme.bp

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
  isDropable?: boolean
  itemColor?: string
}

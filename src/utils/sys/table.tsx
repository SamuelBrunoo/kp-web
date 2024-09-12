import Input from "../../component/Inpts"
import TableActions from "../../component/Table/TableActions"
import { TClient } from "../@types/data/client"
import { TModel } from "../@types/data/model"
import { TProduct } from "../@types/data/product"
import { formatCnpj } from "../helpers/formatters/cnpj"
import { formatCpf } from "../helpers/formatters/cpf"
import { formatMoney } from "../helpers/formatters/money"
import { formatStateRegister } from "../helpers/formatters/stateRegister"

export const tableConfig: {
  [key: string]: TConfig
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
          table={"products"}
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
      { title: "Endereço", field: "address" },
      { title: "CPF / CNPJ", field: "cpfCnpj" },
      { title: "Insc. Estadual", field: "stateRegister" },
      { title: "Pedidos feitos", field: "orders", align: "center" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      address: (item: TClient) => item.address.full,
      cpfCnpj: (item: TClient) =>
        item.cpf ? formatCpf(item.cpf) : formatCnpj(item.cnpj ?? ""),
      stateRegister: (item: TClient) => formatStateRegister(item.stateRegister),
      orders: (item: TClient) => item.orders.length,
      actions: (item: TClient, deleteCallback) => (
        <TableActions
          table={"clients"}
          id={item.id}
          deleteCallback={deleteCallback}
        />
      ),
    },
  },
}

type TColumn = {
  title: string
  field: string
  size?: string | number
  align?: "left" | "center" | "right"
}

export type TConfig = {
  columns: TColumn[]
  specialFields: {
    [key: string]: (item: any, prop2?: any) => any
  }
}

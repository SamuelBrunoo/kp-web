import Input from "../../component/Inpts"
import TableActions from "../../component/Table/TableActions"
import { TModel } from "../@types/data/model"
import { TProduct } from "../@types/data/product"
import { formatMoney } from "../helpers/formatters/money"

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

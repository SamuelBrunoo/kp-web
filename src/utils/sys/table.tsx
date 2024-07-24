import TableActions from "../../component/TableActions"
import { TProduct } from "../@types/data/product"
import { formatMoney } from "../helpers/formatters/money"

export const tableConfig: {
  [key: string]: TConfig
} = {
  products: {
    columns: [
      { title: "Tipo", field: "type" },
      { title: "Modelo", field: "model" },
      { title: "Código", field: "code" },
      { title: "Cores", field: "colors", align: "center" },
      { title: "Estoque", field: "storage", align: "center" },
      { title: "Preço", field: "price" },
      { title: "", field: "actions" },
    ],
    specialFields: {
      type: (item: TProduct) => item.type.name,
      model: (item: TProduct) => item.model.name,
      colors: (item: TProduct) => item.colors.length,
      storage: (item: TProduct) =>
        item.storage.has ? item.storage.quantity : "Não possui",
      price: (item: TProduct) => formatMoney(item.price),
      actions: (item: TProduct) => (
        <TableActions table={"products"} id={item.id} />
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
    [key: string]: (item: any) => any
  }
}

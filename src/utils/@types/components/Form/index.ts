import { FormField } from "../FormFields"

export type TForm = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  handleDelete?: () => Promise<void>
  columns: TColumn[]
  size?: "1/4" | "1/3" | "1/2" | "1"
}

type TColumn = {
  blocks: TBlock[]
}

type TContent = FormField | FormField[]

export type TBlock = {
  title: string
  groups: TGroup[]
}

export type TGroup =
  | {
      type: "custom"
      element: JSX.Element
      title?: string
      centeredLines?: number[]
      columns?: number
    }
  | {
      type: "fields"
      title?: string
      fields: TContent[]
      hasFieldControl?: boolean
      centeredLines?: number[]
      columns?: number
    }

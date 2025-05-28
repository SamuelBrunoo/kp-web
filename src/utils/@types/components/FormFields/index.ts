import { TInputDate } from "../../../../components/Inpts/Date"
import { TInputDefault } from "../../../../components/Inpts/default"
import { TInputMonetary } from "../../../../components/Inpts/monetary"
import { TReadonlyField } from "../../../../components/Inpts/readonly"
import { TInputSelect as TSelect } from "../../../../components/Inpts/Select"
import { TInputSelect as TSearchSelect } from "../../../../components/Inpts/Select"
import { TTextArea } from "../../../../components/Inpts/Textarea"

type IDate = { type: "date" } & TInputDate
type IDefault = { type: "default" } & TInputDefault
type IMonetary = { type: "monetary" } & TInputMonetary
type IReadonly = { type: "readonly" } & TReadonlyField
type ISearchSelect = {
  type: "searchSelect"
  multiple?: boolean
} & TSearchSelect
type ISelect = { type: "select"; multiple?: boolean } & TSelect
type ITextArea = { type: "textarea" } & TTextArea

export type FormField = (
  | IDate
  | IDefault
  | IReadonly
  | ISelect
  | ISearchSelect
  | IMonetary
  | ITextArea
) & {
  gridSizes?: {
    big: number
    medium?: number
    small?: number
  }
  alignBottom?: boolean
}

import { TInputDate } from "../../../../components/Inpts/Date"
import { TInputDefault } from "../../../../components/Inpts/default"
import { TReadonlyField } from "../../../../components/Inpts/readonly"
import { TInputSelect as TSelect } from "../../../../components/Inpts/Select"

type IDate = { type: "date" } & TInputDate
type IDefault = { type: "default" } & TInputDefault
type IReadonly = { type: "readonly" } & TReadonlyField
type ISelect = { type: "select"; multiple?: boolean } & TSelect

export type FormField = (IDate | IDefault | IReadonly | ISelect) & {
  gridSizes?: {
    big: number
    medium?: number
    small?: number
  }
  alignBottom?: boolean
}

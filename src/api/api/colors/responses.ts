import { TDefaultRes } from "../../types/responses"
import { TColor } from "../../../utils/@types/data/color"

export type TApi_Responses_Colors = {
  colors: {
    getColors: Promise<
      TDefaultRes<{
        list: TColor[]
      }>
    >
    getColor: Promise<TDefaultRes<TColor>>
  }
}

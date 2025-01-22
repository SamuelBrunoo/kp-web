import { TDefaultRes } from "../../types/responses"
import { TRepresentative } from "../../../utils/@types/data/representative"

export type TApi_Responses_Representatives = {
  representatives: {
    getRepresentatives: Promise<
      TDefaultRes<{
        list: TRepresentative[]
      }>
    >
    getRepresentative: Promise<TDefaultRes<TRepresentative>>
  }
}

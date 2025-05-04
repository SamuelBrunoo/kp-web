import { TDefaultRes } from "../../types/responses"
import {
  TPageListRepresentative,
  TRepresentative,
} from "../../../utils/@types/data/representative"

export type TApi_Responses_Representatives = {
  representatives: {
    createRepresentative: Promise<TDefaultRes<TRepresentative>>
    updateRepresentative: Promise<TDefaultRes<TRepresentative>>
    getRepresentativesListPage: Promise<
      TDefaultRes<{
        list: TPageListRepresentative[]
      }>
    >
    getRepresentatives: Promise<
      TDefaultRes<{
        list: TRepresentative[]
      }>
    >
    getRepresentative: Promise<TDefaultRes<TRepresentative>>
    deleteRepresentative: Promise<TDefaultRes<{}>>
  }
}

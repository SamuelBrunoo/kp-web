import {
  TNewRepresentative,
  TRepresentative,
} from "../../../utils/@types/data/representative"

export type TApi_Params_Representatives = {
  representatives: {
    createRepresentative: { newRepresentative: TNewRepresentative }
    updateRepresentative: { representative: TRepresentative }
    getRepresentativesListPage: {}
    getRepresentatives: {}
    getRepresentative: { id: string }
    deleteRepresentative: { id: string }
  }
}

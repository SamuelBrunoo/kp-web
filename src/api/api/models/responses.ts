import { TDefaultRes } from "../../types/responses"
import { TModel, TPageListModel } from "../../../utils/@types/data/model"

export type TApi_Responses_Models = {
  models: {
    createModel: Promise<
      TDefaultRes<{
        model: TModel
      }>
    >
    updateModel: Promise<
      TDefaultRes<{
        model: TModel
      }>
    >
    getModels: Promise<
      TDefaultRes<{
        list: TModel[]
      }>
    >
    getModel: Promise<
      TDefaultRes<{
        model: TModel
      }>
    >
    getModelsPageList: Promise<
      TDefaultRes<{
        list: TPageListModel[]
      }>
    >
    deleteModel: Promise<TDefaultRes<{}>>
  }
}

import { TModel, TNewModel } from "../../../utils/@types/data/model"
import { TDefaultFilters } from "../../types/params"

export type TApi_Params_Models = {
  models: {
    createModel: {
      newModel: TNewModel
    }
    updateModel: {
      model: TModel
    }
    getModels: {}
    getModel: {
      id: string
    }
    getModelsPageList: TDefaultFilters
    deleteModel: { id: string }
  }
}

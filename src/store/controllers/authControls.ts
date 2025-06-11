import { TAuth } from "../../utils/@types/api/auth"
import { TSet, TAuthControls } from "../../utils/@types/store"

const authControls = (set: TSet): TAuthControls => {
  return {
    setData: (data: TAuth) => {
      set((store) => ({ ...store, auth: data }))
    },
    clear: () => {
      set((store) => ({
        ...store,
        auth: null,
      }))
    },
  }
}

export default authControls

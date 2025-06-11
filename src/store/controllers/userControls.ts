import { TUser } from "../../utils/@types/data/user"
import { TSet, TUserControls } from "../../utils/@types/store"

const userControls = (set: TSet): TUserControls => {
  return {
    setData: (data: TUser) => {
      set((store) => ({ ...store, user: data }))
    },
    clear: () => {
      set((store) => ({
        ...store,
        user: null,
      }))
    },
  }
}

export default userControls

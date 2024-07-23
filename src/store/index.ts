import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { TStore } from "../utils/@types/store"

const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        // store...
      }),
      {
        name: "kp",
        partialize: (store) => {
          return {}
        },
      }
    )
  )
)

export default getStore

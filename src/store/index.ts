import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { TStore } from "../utils/@types/store"

import userShelf from "./shelfs/user"
import feedbackShelf from "./shelfs/feedback"

import controls from "./controllers"

const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        // store...
        user: userShelf(),
        feedback: feedbackShelf(),

        controllers: controls(set),
      }),
      {
        name: "kp",
        partialize: (store) => {
          return {
            user: store.user,
          }
        },
      }
    )
  )
)

export default getStore

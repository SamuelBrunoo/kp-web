import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { TStore } from "../utils/@types/store"

import authShelf from "./shelfs/auth"
import userShelf from "./shelfs/user"
import feedbackShelf from "./shelfs/feedback"
import modalShelf from "./shelfs/modal"

import controls from "./controllers"

const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        // store...
        auth: authShelf(),
        user: userShelf(),
        feedback: feedbackShelf(),
        modal: modalShelf(),
        controllers: controls(set),
      }),
      {
        name: "kp",
        partialize: (store) => {
          return {
            user: store.user,
            auth: store.auth,
          }
        },
      }
    )
  )
)

export default getStore

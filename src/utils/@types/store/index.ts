// import { TUser } from "../data/"

import { TFeedback } from "../components/feedback"

export type TStore = {
  feedback: TFeedbackShelf

  // Controllers
  controllers: {
    feedback: TFeedbackControls
  }
}

// Shelfs

// export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback

// Controls

export type TFeedbackControls = {
  setData: (feedbackData: TFeedback) => void
  clear: () => void
  fade: () => void
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void

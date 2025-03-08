import { TUser } from "../data/user"
import { TFeedback } from "../components/feedback"

export type TStore = {
  feedback: TFeedbackShelf
  user: TUserShelf

  // Controllers
  controllers: {
    feedback: TFeedbackControls
    user: TUserControls
  }
}

// Shelfs

export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback

// Controls

export type TUserControls = {
  setData: (userData: TUser) => void
  clear: () => void
}

export type TFeedbackControls = {
  setData: (feedbackData: TFeedback) => void
  clear: () => void
  fade: () => void
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void

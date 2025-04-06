import { TUser } from "../data/user"
import { TFeedback } from "../components/feedback"
import { ModalProps } from "../../../components/Modal"

export type TStore = {
  feedback: TFeedbackShelf
  modal: TModalShelf
  user: TUserShelf

  // Controllers
  controllers: {
    feedback: TFeedbackControls
    modal: TModalControls
    user: TUserControls
  }
}

// Shelfs

export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback
export type TModalShelf = ModalProps

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

export type TModalControls = {
  open: (data: ModalProps) => void
  close: () => void
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void

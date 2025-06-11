import { TUser } from "../data/user"
import { TFeedback } from "../components/feedback"
import { ModalProps } from "../../../components/Modal"
import { TAuth } from "../api/auth"

export type TStore = {
  feedback: TFeedbackShelf
  modal: TModalShelf
  user: TUserShelf
  auth: TAuthShelf

  // Controllers
  controllers: {
    feedback: TFeedbackControls
    modal: TModalControls
    user: TUserControls
    auth: TAuthControls
  }
}

// Shelfs

export type TAuthShelf = TAuth | null
export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback
export type TModalShelf = ModalProps

// Controls

export type TAuthControls = {
  setData: (authData: TAuth) => void
  clear: () => void
}

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

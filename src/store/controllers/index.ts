import { TSet } from "../../utils/@types/store"

import feedbackControls from "./feedbackControls"
import modalControls from "./modalControls"
import userControls from "./userControls"
import authControls from "./authControls"

const controls = (set: TSet) => ({
  feedback: feedbackControls(set),
  modal: modalControls(set),
  user: userControls(set),
  auth: authControls(set),
})

export default controls

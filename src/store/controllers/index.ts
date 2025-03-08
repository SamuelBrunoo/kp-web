import { TSet } from "../../utils/@types/store"

import feedbackControls from "./feedbackControls"
import userControls from "./userControls"

const controls = (set: TSet) => ({
  feedback: feedbackControls(set),
  user: userControls(set),
})

export default controls

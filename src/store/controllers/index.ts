import { TSet } from "../../utils/@types/store"

import feedbackControls from "./feedbackControls"

const controls = (set: TSet) => ({
  feedback: feedbackControls(set),
})

export default controls

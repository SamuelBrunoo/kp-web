import { TModalShelf } from "../../utils/@types/store"

const modalShelf = (): TModalShelf => {
  return {
    visible: false,
    role: "loading",
    data: null,
  }
}

export default modalShelf

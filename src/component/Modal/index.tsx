import AddOrderProduct from "./AddOrderProduct"
import LoadingModal from "./Loading"

export type TDefaultProps = {
  showing: boolean
  closeFn: () => void
}

const Modal = {
  AddOrderProduct,
  Loading: LoadingModal,
}

export default Modal

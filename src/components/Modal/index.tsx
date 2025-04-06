import { Dialog, DialogProps } from "@mui/material"
import * as S from "./styles"
import getStore from "../../store"

import { Modal as MuiModal } from "@mui/material"

/*
 *  Variations
 */

import LoadingModal from "./variations/Loading"
import AddOrderProductModal from "./variations/AddOrderProduct"
import { theme } from "../../theme"

export type TDefaultProps = {
  visible: boolean
  onClose?: () => void
}

export type ModalProps = {
  bluredBack?: boolean
  width?: DialogProps["maxWidth"]
  visible: boolean
  onClose?: () => void
  handleOp?: (...params: any) => void | Promise<void>
  children?: JSX.Element | JSX.Element[]
  role: TModals
  data?: any
}

export type TModals = "loading" | "addOrderProduct"

const Modal = () => {
  const { modal, controllers } = getStore()

  const {
    bluredBack = true,
    width,
    role,
    visible,
    data,
    onClose,
    handleOp,
    children,
  } = modal

  const handleClose = () => {
    onClose && onClose()
    controllers.modal.close()
  }

  const renderModalContent = () => {
    let el: any = null

    switch (role) {
      case "addOrderProduct":
        el = (
          <AddOrderProductModal
            data={data}
            onClose={handleClose}
            handleOp={handleOp}
          />
        )
        break
      default:
        el = children
        break
    }

    return el
  }

  return role === "loading" ? (
    <LoadingModal visible={visible} />
  ) : (
    <MuiModal open={visible} onClose={handleClose}>
      <Dialog
        open={visible}
        maxWidth={width}
        sx={{
          width: "100%",
          backdropFilter: bluredBack ? "blur(5px)" : undefined,
          "& .MuiPaper-root": {
            backgroundColor: theme.colors.neutral[700],
            borderRadius: "16px",
            width: "100%",
          },
        }}
      >
        <S.ModalBox>{renderModalContent()}</S.ModalBox>
      </Dialog>
    </MuiModal>
  )
}

export default Modal

/* eslint react-hooks/exhaustive-deps: "off" */

import * as S from "./styles"

import { CircularProgress, Modal } from "@mui/material"
import { TDefaultProps } from ".."

type Props = TDefaultProps

const LoadingModal = ({ showing }: Props) => {
  return (
    <Modal
      open={showing}
      sx={{
        backgroundColor: "transparent",
      }}
      className="loadingModal"
    >
      <S.Content>
        <CircularProgress
          size={48}
          sx={{
            color: (theme) => theme.palette.green[460],
          }}
        />
      </S.Content>
    </Modal>
  )
}

export default LoadingModal

/* eslint react-hooks/exhaustive-deps: "off" */
import { useState } from "react"

import * as DS from "../../styles"
import * as S from "./styles"

import Form from "../../../Form"
import Button from "../../../Button"
import Icons from "../../../../assets/icons"

type TStickerType = "small" | "big"

type Props = {
  onClose: () => void
  handleOp?: (params: { columns: number; rows: number }) => void
  data: {}
}

const initialConfig = { columns: 5, rows: 12 }

const MCodePrintConfig = ({ onClose, handleOp }: Props) => {
  const [stickerType, setStickerType] = useState<TStickerType>("small")

  const [preview, setPreview] = useState(initialConfig)
  const [config, setConfig] = useState(initialConfig)

  const handleClose = () => {
    setConfig(initialConfig)
    setPreview(initialConfig)

    if (onClose) onClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  const handlePrint = () => {
    if (handleOp) {
      handleOp(config)
      handleClose()
    }
  }

  // Renders
  const renderPrintGrid = () => {
    let content: JSX.Element[] = []

    const columns = stickerType === "small" ? 5 : 2
    const rows = stickerType === "small" ? 12 : 3

    for (let rowK = 1; rowK <= rows; rowK++) {
      for (let colK = 1; colK <= columns; colK++) {
        const active = preview.columns >= colK && preview.rows >= rowK

        const newConf = { columns: colK, rows: rowK }

        content.push(
          <S.Slot
            $active={active}
            onClick={() => setConfig(newConf)}
            onMouseOver={() => setPreview(newConf)}
          />
        )
      }
    }
    return (
      <S.GridWrapper
        onMouseLeave={() => {
          setPreview(config)
        }}
      >
        <S.PrintGrid
          $columns={stickerType === "small" ? 5 : 2}
          $rows={stickerType === "small" ? 12 : 3}
        >
          {content}
        </S.PrintGrid>
      </S.GridWrapper>
    )
  }

  return (
    <S.Content>
      <DS.ModalTitles>
        <DS.ModalTitle>Imprimir código</DS.ModalTitle>
        <DS.ModalSubTitle>Configure a impressão</DS.ModalSubTitle>
      </DS.ModalTitles>
      <Form
        handleCancel={() => {}}
        handleField={(_, value) => setStickerType(value)}
        handleSave={async () => {}}
        columns={[
          {
            blocks: [
              {
                groups: [
                  {
                    type: "custom",
                    columns: 12,
                    element: renderPrintGrid(),
                  },
                ],
              },
            ],
          },
        ]}
      />

      <S.Buttons>
        <Button
          type="secondary"
          color="orange"
          startIcon={<Icons.Cancel />}
          action={handleCancel}
          text="Cancelar"
        />
        <Button
          type="primary"
          color="green"
          startIcon={<Icons.Check />}
          action={handlePrint}
          text="Salvar"
        />
      </S.Buttons>
    </S.Content>
  )
}

export default MCodePrintConfig

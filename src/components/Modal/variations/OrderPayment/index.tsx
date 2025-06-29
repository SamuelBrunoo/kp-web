/* eslint react-hooks/exhaustive-deps: "off" */

import * as DS from "../../styles"
import * as S from "./styles"

import { useState } from "react"
import Form from "../../../Form"
import Button from "../../../Button"
import Icons from "../../../../assets/icons"

type Props = {
  onClose: () => void
  handleOp?: (value: number) => void
  data: {}
}

const MOrderPayment = ({ onClose, handleOp }: Props) => {
  const [shippingCost, setShippingCost] = useState("")

  const handleClose = () => {
    setShippingCost("")

    if (onClose) onClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleConfirm = () => {
    if (handleOp) handleOp(+shippingCost)
    handleClose()
  }

  // Operations

  const handleField = (_: string, value: any) => {
    setShippingCost(value)
  }

  return (
    <S.Content>
      <DS.ModalTitles>
        <DS.ModalTitle>Emissão de boletos do pedido</DS.ModalTitle>
        <DS.ModalSubTitle>Dados de envio</DS.ModalSubTitle>
      </DS.ModalTitles>
      <Form
        handleCancel={() => {}}
        handleField={handleField}
        handleSave={async () => {}}
        columns={[
          {
            blocks: [
              {
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "monetary",
                          field: "shippingCost",
                          value: shippingCost,
                          label: "Custo de envio",
                          gridSizes: { big: 4, small: 12 },
                        },
                      ],
                    ],
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
          action={handleConfirm}
          text="Solicitar"
        />
      </S.Buttons>
    </S.Content>
  )
}

export default MOrderPayment

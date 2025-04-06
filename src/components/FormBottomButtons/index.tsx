import Button from "../Button"
import * as S from "./styles"

type Props = {
  id?: string
  handleDelete: (id: string) => void | Promise<void>
  handleCancel: () => void | Promise<void>
  handleSave: (...params: any[]) => void | Promise<void>
  deleting?: boolean
  submitting?: boolean
}

const FormBottomButtons = ({
  id,
  handleDelete,
  handleCancel,
  handleSave,
  deleting,
  submitting,
}: Props) => {
  return (
    <S.FormGroup
      style={{
        width: "100%",
        justifyContent: id ? "space-between" : "flex-end",
      }}
    >
      <S.FormLine
        style={{
          width: "100%",
          justifyContent: id ? "space-between" : "flex-end",
        }}
      >
        {id && (
          <Button
            text="Deletar"
            color="red"
            type="primary"
            action={handleDelete}
            loading={deleting}
          />
        )}

        <S.ButtonsArea>
          <Button
            color="orange"
            action={handleCancel}
            text="Cancelar"
            type="secondary"
            disabled={submitting}
          />
          <Button
            color="green"
            action={handleSave}
            text={!id ? "Cadastrar" : "Atualizar"}
            type="primary"
            loading={submitting}
          />
        </S.ButtonsArea>
      </S.FormLine>
    </S.FormGroup>
  )
}

export default FormBottomButtons

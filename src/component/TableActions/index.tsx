import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import icons from "../../assets/icons"

type Props = {
  table: "products"
  id: string
}

const TableActions = ({ table, id }: Props) => {
  const handleEdit = () => {
    // ...
  }

  const handleDelete = () => {
    // ...
  }

  return (
    <S.Wrapper className="actions-area">
      <S.Content>
        <S.Action onClick={handleEdit} $role={"edit"}>
          {icons.edit}
        </S.Action>
        <S.Action onClick={handleDelete} $role={"trash"}>
          {icons.trash}
        </S.Action>
      </S.Content>
    </S.Wrapper>
  )
}

export default TableActions

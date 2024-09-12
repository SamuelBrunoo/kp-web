import * as S from "./styles"
import icons from "../../../assets/icons"
import { Api } from "../../../api"

import { useNavigate } from "react-router-dom"

type Props = {
  table: "products" | "models" | "modelVariations" | "clients"
  id: string
  deleteCallback?: (params?: any) => void
}

const TableActions = ({ table, id, deleteCallback }: Props) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    let url = ""

    switch (table) {
      case "products":
      case "models":
      case "clients":
        url = `single/${id}`
        break
      case "modelVariations":
        url = `/dashboard/products/single/${id}`
        break
      default:
        break
    }

    navigate(url)
  }

  const getDeleteEndpoint = () => {
    switch (table) {
      case "products":
        return Api.delete.product
      case "models":
        return Api.delete.model
      default:
        break
    }
  }

  const handleDelete = async () => {
    const fn = getDeleteEndpoint()

    if (fn) {
      try {
        const req = await fn({ id })
        if (req.success && deleteCallback) deleteCallback(id)
        // confirm modal
      } catch (error) {
        // alert message
      }
    }
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

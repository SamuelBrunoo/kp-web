import * as S from "./styles"
import icons from "../../../assets/icons"

import { useNavigate } from "react-router-dom"
import getStore from "../../../store"
import { Api } from "../../../api"
import { TDefaultBodyRes } from "../../../utils/@types/api/responses"

type Props = {
  table:
    | "products"
    | "models"
    | "modelVariations"
    | "clients"
    | "representatives"
    | "orders"
    | "orderFormProduct"
  id: string
  deleteCallback?: (params?: any, p2?: any) => void
  noEdit?: boolean
  noDelete?: boolean
  canDelete?: boolean
}

const TableActions = ({
  table,
  id,
  deleteCallback,
  noEdit,
  noDelete,
  canDelete,
}: Props) => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const handleEdit = () => {
    let url = ""

    switch (table) {
      case "products":
      case "models":
      case "clients":
      case "representatives":
      case "orders":
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

  const getDeleteEndpoint: ({ id }: { id: string }) => Promise<any> = async ({
    id,
  }: {
    id: string
  }) => {
    switch (table) {
      case "products":
        return await Api.products.deleteProduct({ id })
      case "models":
        return await Api.models.deleteModel({ id })
      case "clients":
        return await Api.clients.deleteClient({ id })
      case "orders":
        return await Api.orders.deleteOrder({ id })
      case "representatives":
        return await Api.representatives.deleteRepresentative({ id })
      default:
        return () => ({ ok: true })
    }
  }

  const handleDelete = async () => {
    // confirm modal...

    const action = (await getDeleteEndpoint({ id })) as TDefaultBodyRes<any>

    if (action.ok) {
      try {
        if (deleteCallback) deleteCallback(id)
      } catch (error) {
        controllers.feedback.setData({
          message:
            error.message ??
            "Não foi possível excluir. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
      }
    }
  }

  return (
    <S.Wrapper className="actions-area">
      <S.Content>
        {!noEdit && (
          <S.Action onClick={handleEdit} $role={"edit"}>
            <icons.Edit />
          </S.Action>
        )}
        {!noDelete && (
          <S.Action
            onClick={canDelete ? handleDelete : () => {}}
            $role={"trash"}
            $disabled={!canDelete}
          >
            <icons.Trash />
          </S.Action>
        )}
      </S.Content>
    </S.Wrapper>
  )
}

export default TableActions

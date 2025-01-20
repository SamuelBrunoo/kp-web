import * as S from "./styles"
import icons from "../../../assets/icons"
import { Api } from "../../../api"

import { useNavigate } from "react-router-dom"
import getStore from "../../../store"

type Props = {
  table:
    | "products"
    | "models"
    | "modelVariations"
    | "clients"
    | "orders"
    | "orderFormProduct"
  id: string
  deleteCallback?: (params?: any, p2?: any) => void
  noEdit?: boolean
  noDelete?: boolean
}

const TableActions = ({
  table,
  id,
  deleteCallback,
  noEdit,
  noDelete,
}: Props) => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const handleEdit = () => {
    let url = ""

    switch (table) {
      case "products":
      case "models":
      case "clients":
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

  const getDeleteEndpoint = () => {
    switch (table) {
      case "products":
        return Api.delete.product
      case "models":
        return Api.delete.model
      case "clients":
        return Api.delete.client
      case "orders":
        return Api.delete.order
      case "orderFormProduct":
        return true
      default:
        break
    }
  }

  const handleDelete = async () => {
    const fn = getDeleteEndpoint()

    if (fn) {
      try {
        if (typeof fn === "boolean" && deleteCallback) deleteCallback(id)
        else if (typeof fn !== "boolean") {
          // confirm modal
          const req = await fn({ id })
          if (req.success && deleteCallback) deleteCallback(id)
          else {
            if (!req.success) throw new Error(req.error.message)
            else
              throw new Error("Ops! Houve um erro, tente novamente mais tarde")
          }
        }
      } catch (error) {
        // alert message
        controllers.feedback.setData({
          message: (error as any).message,
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
            <icons.edit />
          </S.Action>
        )}
        {!noDelete && (
          <S.Action onClick={handleDelete} $role={"trash"}>
            <icons.trash />
          </S.Action>
        )}
      </S.Content>
    </S.Wrapper>
  )
}

export default TableActions

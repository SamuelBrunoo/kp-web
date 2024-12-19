/* eslint react-hooks/exhaustive-deps: "off" */

import * as DS from "../styles"
import * as S from "./styles"

import { Modal } from "@mui/material"
import { TDefaultProps } from ".."
import { TProduct } from "../../../utils/@types/data/product"
import Input from "../../Inpts"
import { useEffect, useState } from "react"
import { TProductType } from "../../../utils/@types/data/productType"
import { TColor } from "../../../utils/@types/data/color"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { TRoOption } from "../../../utils/@types/sys/roOptions"
import { TModel } from "../../../utils/@types/data/model"
import icons from "../../../assets/icons"
import { TNewOrder } from "../../../utils/@types/data/order"

type Props = TDefaultProps & {
  onSave: (product: TProduct, quantity: number) => void
  data: {
    prodTypes: TProductType[]
    products: TProduct[]
    models: TModel[]
    colors: TColor[]
    orderProducts: TNewOrder["products"]
  }
}

const MAddOrderProduct = ({ showing, closeFn, data, onSave }: Props) => {
  const [product, setProduct] = useState<TProduct | undefined>()

  const [info, setInfo] = useState({
    type: "",
    model: "",
    color: "",
    quantity: "1",
  })

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    types: [],
    models: [],
    colors: [],
  })

  const handleClose = () => {
    setProduct(undefined)
    setInfo({ type: "", model: "", color: "", quantity: "1" })
    setOptions({ types: [], models: [], colors: [] })
    closeFn()
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleAdd = () => {
    if (product) {
      onSave(product, Number(info.quantity) ?? 1)
      handleClose()
    }
  }

  // Operations

  const handleField = (field: string, value: any) => {
    setInfo((inf) => ({ ...inf, [field]: value }))
  }

  // Auto Matching

  useEffect(() => {
    const m = data.models.find((mod) => mod.code === info.model) as TModel
    const c = data.colors.find((col) => col.code === info.color) as TColor

    if (m && c) {
      const fullCode = `${m.code}${c.code}`
      const p = data.products.find((p) => p.code === fullCode)
      const orderProdData = data.orderProducts.find((p) => p.code === fullCode)
      const pData: TNewOrder["products"][number] | TProduct | undefined =
        orderProdData && p
          ? {
              ...p,
              storage: !p?.storage.has
                ? p?.storage
                : {
                    ...p?.storage,
                    quantity:
                      p?.storage.quantity - orderProdData?.quantity > -1
                        ? p?.storage.quantity - orderProdData?.quantity
                        : 0,
                  },
            }
          : p
      setProduct(pData)
    }
  }, [info.color])

  useEffect(() => {
    if (info.model) {
      const regColors = data.products
        .filter((p) => p.model === info.model)
        .map((p) => p.color)

      const mdList = data.colors.filter((i) => regColors.includes(i.code))

      if (mdList.length > 0) {
        const c1 = mdList[0].code
        setInfo((inf) => ({ ...inf, color: c1 }))
      }

      const modelColors = parseRoOption(mdList, "name", "code").sort((a, b) =>
        a.value.toLowerCase().localeCompare(b.value)
      )

      setOptions((opts) => ({ ...opts, colors: modelColors }))
    } else {
      setInfo((inf) => ({ ...inf, color: "" }))
      setOptions((opts) => ({ ...opts, colors: [] }))
    }
  }, [info.model])

  useEffect(() => {
    if (!!info.type) {
      const registeredModels = data.products.map((p) => p.model)
      const ptList = data.models.filter(
        (m) => m.type === info.type && registeredModels.includes(m.code)
      )

      if (ptList.length > 0) {
        const m1 = ptList[0].code
        setInfo((inf) => ({ ...inf, model: m1 }))
      }

      const typeModels = parseRoOption(ptList, "name", "code").sort((a, b) =>
        a.value.toLowerCase().localeCompare(b.value)
      )

      if (typeModels.length === 0) {
        setInfo((inf) => ({ ...inf, model: "", color: "" }))
        setOptions((opts) => ({ ...opts, models: typeModels }))
      } else setOptions((opts) => ({ ...opts, models: typeModels }))
    } else {
      setInfo((inf) => ({ ...inf, model: "", color: "" }))
      setOptions((opts) => ({ ...opts, models: [], colors: [] }))
    }
  }, [info.type])

  useEffect(() => {
    if (data && data.prodTypes.length > 0) {
      const tOpts = parseRoOption(data.prodTypes, "name", "code").sort((a, b) =>
        a.value.toLowerCase().localeCompare(b.value)
      )

      setOptions((opts) => ({ ...opts, types: tOpts }))

      // # set 1st alphabetical option

      // const t = tOpts.sort((a, b) =>
      //   a.value.toLowerCase().localeCompare(b.value)
      // )[0].key

      setInfo((inf) => ({ ...inf, type: "pendant" }))
    }
  }, [data])

  return (
    <Modal open={showing} onClose={handleClose}>
      <DS.ModalBox>
        <S.Content>
          <DS.ModalTitle>Adicionar produto no pedido</DS.ModalTitle>
          <S.FormGroup>
            <S.GroupTitle>Escolha o produto</S.GroupTitle>
            <S.FormLine>
              <Input.Select
                label="Tipo"
                onChange={(v) => handleField("type", v)}
                value={info.type}
                roOptions={options.types}
              />
              <Input.Select
                label="Modelo"
                onChange={(v) => handleField("model", v)}
                value={info.model}
                roOptions={options.models}
              />
              <Input.Select
                label="Cor"
                onChange={(v) => handleField("color", v)}
                value={info.color}
                roOptions={options.colors}
              />
            </S.FormLine>
          </S.FormGroup>
          <S.FormGroup>
            <S.GroupTitle>Controle de estoque</S.GroupTitle>
            <S.FormLine>
              <Input.Default
                label="Quantidade"
                onChange={(v) => handleField("quantity", v)}
                value={info.quantity}
                isNumber={true}
              />
              <Input.Readonly
                label="Disponível"
                value={product?.storage.quantity}
              />
            </S.FormLine>
            <S.FormLine>
              <S.QuantityAlert
                $showing={
                  product !== undefined &&
                  (product?.storage.quantity ?? 0) -
                    Number(info.quantity ?? 0) <
                    0
                }
              >
                O montante que falta (
                {((product?.storage.quantity ?? 0) -
                  Number(info.quantity ?? 0)) *
                  -1}
                ) será adicionado na fila de montagem
              </S.QuantityAlert>
            </S.FormLine>
          </S.FormGroup>
          <S.Buttons>
            <S.Button $role="cancel" onClick={handleCancel}>
              {icons.cancel}
              <span>Cancelar</span>
            </S.Button>
            <S.Button
              $role="save"
              onClick={product && handleAdd}
              disabled={!product}
            >
              {icons.check}
              <span>Salvar</span>
            </S.Button>
          </S.Buttons>
        </S.Content>
      </DS.ModalBox>
    </Modal>
  )
}

export default MAddOrderProduct

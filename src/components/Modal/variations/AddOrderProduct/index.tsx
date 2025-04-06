/* eslint react-hooks/exhaustive-deps: "off" */

import * as DS from "../../styles"
import * as S from "./styles"

import { TProduct } from "../../../../utils/@types/data/product"
import { useEffect, useState } from "react"
import { TProductType } from "../../../../utils/@types/data/productType"
import { TColor } from "../../../../utils/@types/data/color"
import { parseRoOption } from "../../../../utils/helpers/parsers/roOption"
import { TRoOption } from "../../../../utils/@types/sys/roOptions"
import { TModel } from "../../../../utils/@types/data/model"
import { TNewOrder } from "../../../../utils/@types/data/order"
import Form from "../../../Form"
import Button from "../../../Button"
import Icons from "../../../../assets/icons"

type Props = {
  onClose: () => void
  handleOp?: (product: TProduct, quantity: number) => void
  data: {
    prodTypes: TProductType[]
    products: TProduct[]
    models: TModel[]
    colors: TColor[]
    orderProducts: TNewOrder["products"]
  }
}

const MAddOrderProduct = ({ onClose, data, handleOp }: Props) => {
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

    if (onClose) onClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleAdd = () => {
    if (product && handleOp) {
      handleOp(product, Number(info.quantity) ?? 1)
      handleClose()
    }
  }

  // Operations

  const handleField = (field: string, value: any) => {
    setInfo((inf) => ({ ...inf, [field]: value }))
  }

  // Auto Matching

  useEffect(() => {
    console.log(product)
  }, [product])

  useEffect(() => {
    const m = data.models.find((mod: TModel) => mod.id === info.model) as TModel
    const c = data.colors.find(
      (col: TColor) => col.code === info.color
    ) as TColor

    if (m && c) {
      const fullCode = `${m.code}${c.code}`
      const p = data.products.find((p: TProduct) => p.code === fullCode)
      const orderProdData = data.orderProducts.find(
        (p: TProduct) => p.code === fullCode
      )
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
      const regColors = (data.products as TProduct[])
        .filter((p) => p.model === info.model)
        .map((p) => p.color)

      const mdList = data.colors.filter((i: TColor) =>
        regColors.includes(i.code)
      )

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
      const registeredModels = (data.models as TModel[]).map((p) => p.id)
      const ptList = (data.models as TModel[]).filter(
        (m) => m.type === info.type && registeredModels.includes(m.id)
      )

      if (ptList.length > 0) {
        const m1 = ptList[0].id
        setInfo((inf) => ({ ...inf, model: m1 }))
      }

      const typeModels = parseRoOption(ptList, "name", "id").sort((a, b) =>
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
    console.log(data)

    if (data && data.prodTypes.length > 0) {
      const tOpts = parseRoOption(data.prodTypes, "name", "code").sort((a, b) =>
        a.value.toLowerCase().localeCompare(b.value)
      )

      setOptions((opts) => ({ ...opts, types: tOpts }))

      setInfo((inf) => ({ ...inf, type: "pendant" }))
    }
  }, [data])

  return (
    <S.Content>
      <DS.ModalTitles>
        <DS.ModalTitle>Pedido</DS.ModalTitle>
        <DS.ModalSubTitle>Adicionar produto</DS.ModalSubTitle>
      </DS.ModalTitles>
      <Form
        handleCancel={() => {}}
        handleField={handleField}
        handleSave={async () => {}}
        columns={[
          {
            blocks: [
              {
                title: "Escolha o produto",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "select",
                          field: "type",
                          options: options.types,
                          value: info.type,
                          label: "Tipo",
                          gridSizes: { big: 3 },
                        },
                        {
                          type: "select",
                          field: "model",
                          options: options.models,
                          value: info.model,
                          label: "Modelo",
                          gridSizes: { big: 3 },
                        },
                        {
                          type: "select",
                          field: "color",
                          options: options.colors,
                          value: info.color,
                          label: "Cor",
                          gridSizes: { big: 3 },
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                title: "Controle de estoque",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "default",
                          field: "quantity",
                          value: info.quantity,
                          label: "Quantidade",
                          gridSizes: { big: 3 },
                        },
                        {
                          type: "readonly",
                          field: "available",
                          value: String(product?.storage.quantity ?? 0),
                          label: "Disponível",
                          gridSizes: { big: 3 },
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
      <S.FormGroup>
        <S.FormLine>
          <S.QuantityAlert
            $showing={
              product !== undefined &&
              (product?.storage.quantity ?? 0) - Number(info.quantity ?? 0) < 0
            }
          >
            O montante que falta (
            {((product?.storage.quantity ?? 0) - Number(info.quantity ?? 0)) *
              -1}
            ) será adicionado na fila de montagem
          </S.QuantityAlert>
        </S.FormLine>
      </S.FormGroup>
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
          action={handleAdd}
          text="Salvar"
          disabled={!product}
        />
      </S.Buttons>
    </S.Content>
  )
}

export default MAddOrderProduct

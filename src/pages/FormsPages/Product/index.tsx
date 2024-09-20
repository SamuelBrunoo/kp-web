/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"
import { TModel } from "../../../utils/@types/data/model"
import { TColor } from "../../../utils/@types/data/color"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"

import { initialForm } from "../../../utils/initialData/form"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { TProductType } from "../../../utils/@types/data/productType"
import { TNewProduct, TProduct } from "../../../utils/@types/data/product"

const ProductForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [product, setProduct] = useState<TNewProduct | TProduct>(
    initialForm.product as any
  )

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    storage: [
      { key: "true", value: "Sim" },
      { key: "false", value: "Não" },
    ],
    prodTypes: [],
    models: [],
    colors: [],
  })

  const [prodTypes, setProdTypes] = useState<TProductType[]>([])
  const [models, setModels] = useState<TModel[]>([])
  const [colors, setColors] = useState<TColor[]>([])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    if (id) {
      // edit ...
      const update = await Api.update.product(product as TProduct)

      if (update.success) navigate(-1)
    } else {
      const create = await Api.new.product(product as TNewProduct)

      if (create.success) navigate(-1)
    }
  }

  const handleField = useCallback((field: string, value: any) => {
    if (field === "hasStorage") {
      setProduct((p) => ({
        ...p,
        storage: { ...p.storage, has: value === "true" },
      }))
    } else if (field === "storage") {
      setProduct((p) => ({ ...p, storage: { ...p.storage, quantity: value } }))
    } else setProduct((p) => ({ ...p, [field]: value }))
  }, [])

  const computeCode = () => {
    if (
      models.length > 0 &&
      colors.length > 0 &&
      !!product.model &&
      !!product.color
    ) {
      const pickedModel = models.find((m) => m.code === product.model)
      const pickedColor = colors.find((m) => m.code === product.color)

      const computedCode = `${pickedModel?.code ?? ""}${
        pickedColor?.code ?? ""
      }`

      handleField("code", computedCode)
    }
  }

  // # Code auto compiler
  useEffect(() => {
    computeCode()
  }, [product.model, product.color])

  // # Auto matching options

  useEffect(() => {
    if (!!product.type) {
      const tp = prodTypes.find((t) => t.code === product.type) as TProductType
      const tpModels = models.filter((m) => m.type === tp.code)

      const parsedOptions = parseRoOption(tpModels, "name", "code")

      setOptions((o) => ({ ...o, models: parsedOptions }))

      const pModel = parsedOptions.length > 0 ? parsedOptions[0].key : ""

      setProduct((p) => ({ ...p, model: pModel }))
    } else {
      if (prodTypes.length > 0)
        setProduct((p) => ({ ...p, type: prodTypes[0].code }))
    }
  }, [prodTypes, product.type])

  useEffect(() => {
    if (product.model) {
      const m = models.find((m) => m.code === product.model) as TModel
      const mColors = m ? colors.filter((c) => m.colors.includes(c.code)) : []

      const parsedOptions = parseRoOption(mColors, "name", "code")

      console.log(m)

      setOptions((o) => ({
        ...o,
        colors: parsedOptions,
      }))

      const pColor = parsedOptions.length > 0 ? parsedOptions[0].key : ""

      setProduct((p) => ({ ...p, color: pColor }))
    }
  }, [product.model])

  useEffect(() => {
    if (options.models.length > 0) {
      setProduct((p) => ({ ...p, model: options.models[0].key ?? "" }))
    }
  }, [options.models])

  // # Initial loading

  const loadData = useCallback(async () => {
    try {
      const pageInfo = await Api.pageInfo.productForm({})

      if (pageInfo.success) {
        const opts = {
          prodTypes: parseRoOption(pageInfo.data.prodTypes, "name", "code"),
          models: parseRoOption(pageInfo.data.models, "name", "code"),
          colors: parseRoOption(pageInfo.data.colors, "name", "code"),
        }

        setOptions((o) => ({ ...o, ...opts }))

        setProdTypes(pageInfo.data.prodTypes)
        setModels(pageInfo.data.models)
        setColors(pageInfo.data.colors)

        if (id) {
          const pInfo = await Api.get.product({ id })
          setTimeout(() => {
            if (pInfo.success) {
              const p = pInfo.data.product

              setProduct(p)
            }
          }, 150)
        }
      }
    } catch (error) {
      alert("Tente novamente mais tarde")
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <PageHead
        title={"Produtos"}
        subtitle={`${id ? "Edição" : "Cadastro"} de produto`}
        buttons={[
          { role: "cancel", text: "Cancelar", onClick: handleCancel },
          {
            role: id ? "update" : "new",
            text: id ? "Salvar" : "Cadastrar",
            onClick: handleSave,
          },
        ]}
      />

      {/* form */}
      <S.FormGroup>
        <S.GroupTitle>Informações gerais</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Tipo"
            onChange={(v) => handleField("type", v)}
            value={product.type}
            roOptions={options.prodTypes}
          />
          <Input.Select
            label="Modelo"
            onChange={(v) => handleField("model", v)}
            value={product.model}
            roOptions={options.models}
          />
          <Input.Select
            label="Cor"
            onChange={(v) => handleField("color", v)}
            value={product.color}
            roOptions={options.colors}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Readonly label="Código" value={product.code} />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Estoque</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Tem estoque"
            onChange={(v) => handleField("hasStorage", v)}
            value={String(product.storage.has)}
            roOptions={options.storage}
          />
          {product.storage.has && (
            <Input.Default
              label="Quantidade"
              onChange={(v) => handleField("storage", v)}
              value={product.storage.quantity}
              disabled={!Boolean(product.storage.has)}
              isNumber={true}
            />
          )}
        </S.FormLine>
      </S.FormGroup>
    </S.Content>
  )
}

export default ProductForm

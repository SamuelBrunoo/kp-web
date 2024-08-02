import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Api } from "../../api"

import * as S from "./styles"

import { TRoOption } from "../../utils/@types/sys/roOptions"
import { TModel } from "../../utils/@types/data/model"
import { TColor } from "../../utils/@types/data/color"

import PageHead from "../../component/PageHead"
import Input from "../../component/Inpts"

import { initialForm } from "../../utils/initialData/form"
import { parseRoOption } from "../../utils/helpers/parsers/roOption"
import { TProductType } from "../../utils/@types/data/productType"

const ProductForm = () => {
  const navigate = useNavigate()

  const [product, setProduct] = useState(initialForm.product)

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

  const handleSave = () => {
    // ...
  }

  const handleField = useCallback((field: string, value: any) => {
    setProduct((p) => ({ ...p, [field]: value }))
  }, [])

  const computeCode = () => {
    if (
      models.length > 0 &&
      colors.length > 0 &&
      !!product.model &&
      !!product.color
    ) {
      const pickedModel = models.find((m) => m.id === product.model)
      const pickedColor = colors.find((m) => m.id === product.color)

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
      const tp = prodTypes.find((t) => t.id === product.type) as TProductType
      const tpModels = models.filter((m) => m.type === tp.key)

      const parsedOptions = parseRoOption(tpModels, "name", "id")

      setOptions((o) => ({
        ...o,
        models: parsedOptions,
      }))

      const pModel = parsedOptions.length > 0 ? parsedOptions[0].key : ""

      setProduct((p) => ({ ...p, model: pModel }))
    }
  }, [product.type])

  useEffect(() => {
    if (product.model) {
      const m = models.find((m) => m.id === product.model) as TModel
      const mColors = colors.filter((c) => m.colors.includes(c.code))

      const parsedOptions = parseRoOption(mColors, "name", "id")

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
          prodTypes: parseRoOption(pageInfo.data.prodTypes, "name", "id"),
          models: parseRoOption(pageInfo.data.models, "name", "id"),
          colors: parseRoOption(pageInfo.data.colors, "name", "id"),
        }

        setOptions((o) => ({ ...o, ...opts }))

        setProdTypes(pageInfo.data.prodTypes)
        setModels(pageInfo.data.models)
        setColors(pageInfo.data.colors)
        // @ts-ignore
        setProduct((p) => ({
          ...p,
          hasStorage: options.storage[0].key,
        }))
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
        subtitle="Cadastro de produto"
        buttons={[
          { role: "cancel", text: "Cancelar", onClick: handleCancel },
          { role: "new", text: "Novo", onClick: handleSave },
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
        <S.GroupTitle>Informações de venda</S.GroupTitle>
        <S.FormLine>
          <Input.Monetary
            label="Preço Unitário"
            onChange={(v) => handleField("price", v)}
            value={product.price}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Estoque</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Tem estoque"
            onChange={(v) => handleField("hasStorage", v)}
            value={product.hasStorage}
            roOptions={options.storage}
          />
          {product.hasStorage && (
            <Input.Default
              label="Quantidade"
              onChange={(v) => handleField("storage", v)}
              value={product.storage}
              disabled={product.hasStorage !== "true"}
            />
          )}
        </S.FormLine>
      </S.FormGroup>
    </S.Content>
  )
}

export default ProductForm

/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"
import { TModel } from "../../../utils/@types/data/model"
import { TColor } from "../../../utils/@types/data/color"

import PageHead from "../../../components/PageHead"

import { initialForm } from "../../../utils/initialData/form"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { TProductType } from "../../../utils/@types/data/productType"
import { TNewProduct, TProduct } from "../../../utils/@types/data/product"
import getStore from "../../../store"
import Button from "../../../components/Button"
import { FormControlLabel, Switch } from "@mui/material"
import LoadingModal from "../../../components/Modal/variations/Loading"
import Form from "../../../components/Form"

const ProductForm = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
    setSubmitting(true)

    // Check errors

    try {
      const m = models.find((m) => m.code === product.model)

      if (id) {
        // edit ...
        const productInfo: TProduct = {
          ...product,
          id: id,
          price: m?.price as number,
          model: m?.id as string,
          storage: {
            ...product.storage,
            quantity: product.storage.has ? product.storage.quantity : 0,
          },
        }

        const update = await Api.products.updateProduct({
          product: productInfo,
        })

        if (update.ok) {
          controllers.feedback.setData({
            message: "Produto atualizado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        } else {
          controllers.feedback.setData({
            message: update.error.message,
            state: "alert",
            visible: true,
          })
        }
      } else {
        const create = await Api.products.createProduct({
          newProduct: {
            ...(product as TNewProduct),
            model: m?.id as string,
            storage: {
              ...product.storage,
              quantity: product.storage.has ? product.storage.quantity : 0,
            },
          },
        })

        if (create.ok) {
          controllers.feedback.setData({
            message: "Produto cadastrado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        } else {
          controllers.feedback.setData({
            message: create.error.message,
            state: "alert",
            visible: true,
          })
        }
      }
    } catch (error) {
      controllers.feedback.setData({
        message: `Houve um erro ao ${
          id ? "atualizar" : "cadastrar"
        } o produto.`,
        state: "alert",
        visible: true,
      })
    }

    setSubmitting(false)
  }

  const handleField = useCallback((field: string, value: any) => {
    if (field === "hasStorage") {
      setProduct((p) => ({
        ...p,
        storage: { ...p.storage, has: value === "true" },
      }))
    } else if (field === "storage") {
      const v = !Number.isNaN(value) ? +value : 0

      setProduct((p) => ({ ...p, storage: { ...p.storage, quantity: v } }))
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

  const handleDelete = async () => {
    setDeleting(true)

    if (id) {
      const req = await Api.products.deleteProduct({ id })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Produto deletado com sucesso",
          state: "success",
          visible: true,
        })
        navigate(-1)
      } else {
        controllers.feedback.setData({
          message: "Ops! Houve um problema. Tente novamente mais tarde.",
          state: "alert",
          visible: true,
        })
      }
    }

    setDeleting(false)
  }

  // # Initial loading

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const pageInfo = await Api.products.formBare({ id })

      if (pageInfo.ok) {
        const opts = {
          prodTypes: parseRoOption(pageInfo.data.prodTypes, "name", "code"),
          models: parseRoOption(pageInfo.data.models, "name", "code"),
          colors: parseRoOption(pageInfo.data.colors, "name", "code"),
        }

        setOptions((o) => ({ ...o, ...opts }))

        setProdTypes(pageInfo.data.prodTypes)
        setModels(pageInfo.data.models)
        setColors(pageInfo.data.colors)

        if (pageInfo.data.product) setProduct(pageInfo.data.product)
      } else {
        controllers.feedback.setData({
          message: pageInfo.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message: error.message,
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <LoadingModal visible={loading} />

      <PageHead
        title={"Produtos"}
        subtitle={`${id ? "Edição" : "Cadastro"} de produto`}
        forForm={true}
      />

      {/* form */}
      <Form
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
        columns={[
          {
            blocks: [
              {
                groups: [
                  {
                    type: "fields",
                    title: "Informações gerais",
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "select",
                          field: "type",
                          label: "Tipo do modelo",
                          options: options.prodTypes,
                          value: product.type,
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "select",
                          field: "model",
                          label: "Modelo",
                          options: options.models,
                          value: product.model,
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "select",
                          field: "color",
                          label: "Cor",
                          options: options.colors,
                          value: product.color,
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                      {
                        type: "readonly",
                        field: "code",
                        label: "Código",
                        value: product.code,
                        gridSizes: { big: 2, small: 12 },
                      },
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Estoque",
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "select",
                          field: "hasStorage",
                          label: "Tem estoque",
                          options: options.storage,
                          value: String(product.storage.has),
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "default",
                          field: "storage",
                          label: "Quantidade",
                          value:
                            String(
                              !Number.isNaN(product.storage.quantity)
                                ? product.storage.quantity
                                : 0
                            ).replace(/\D/g, "") ?? "0",
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                    ],
                  },
                  {
                    type: "custom",
                    columns: 12,
                    element: (
                      <FormControlLabel
                        sx={{
                          "&:has(.Mui-checked) .MuiSwitch-track": {
                            backgroundColor: (theme) =>
                              product.active
                                ? theme.palette.green[460]
                                : undefined,
                          },
                          "& .Mui-checked .MuiSwitch-thumb": {
                            backgroundColor: (theme) =>
                              theme.palette.green[500],
                          },
                          "& .MuiTypography-root": {
                            fontFamily: "Poppins",
                            fontWeight: 300,
                            color: (theme) => theme.palette.neutral[300],
                            fontSize: 14,
                          },
                        }}
                        label="Status"
                        control={
                          <Switch
                            checked={product.active}
                            onChange={() =>
                              handleField("active", !product.active)
                            }
                          />
                        }
                      />
                    ),
                  },
                ],
              },
            ],
          },
        ]}
      />

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
    </S.Content>
  )
}

export default ProductForm

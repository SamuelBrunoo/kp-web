import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"
import {
  TModel,
  TModelDetails,
  TNewModel,
} from "../../../utils/@types/data/model"
import { initialForm } from "../../../utils/initialData/form"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { tableConfig } from "../../../utils/sys/table"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"
import Table from "../../../component/Table"
import getStore from "../../../store"
import Button from "../../../component/Button"
import { TColor } from "../../../utils/@types/data/color"
import { Grid2, Typography } from "@mui/material"
import Modal from "../../../component/Modal"

const ModelForm = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [model, setModel] = useState<Partial<TModel>>(initialForm.model as any)
  const [allowedColors, setAllowedColors] = useState<
    (TColor & { checked: boolean })[]
  >([])
  const [variations, setVariations] = useState<TModelDetails["variations"]>([])

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    storage: [
      { key: "true", value: "Sim" },
      { key: "false", value: "Não" },
    ],
    prodTypes: [],
    colors: [],
  })

  const toggleColor = (colorCode: string) => {
    setAllowedColors(
      allowedColors.map((ac) =>
        ac.code !== colorCode ? ac : { ...ac, checked: !ac.checked }
      )
    )
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    setSubmitting(true)

    try {
      if (id) {
        // edit ...
        const cls = allowedColors
          .map((ac) => (ac.checked ? ac.code : null))
          .filter((ac) => ac)

        const update = await Api.models.updateModel({
          model: { ...model, colors: cls } as TModel,
        })

        if (update.ok) {
          controllers.feedback.setData({
            message: "Modelo atualizado com sucesso",
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
        const cls = allowedColors
          .map((ac) => (ac.checked ? ac.code : null))
          .filter((ac) => ac)

        console.log(model)

        const create = await Api.models.createModel({
          newModel: { ...model, colors: cls } as TNewModel,
        })

        if (create.ok) {
          controllers.feedback.setData({
            message: "Modelo adicionado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        } else {
          controllers.feedback.setData({
            message: create.error.message,
            state: "error",
            visible: true,
          })
        }
      }
    } catch (error) {
      controllers.feedback.setData({
        message: `Houve um erro ao ${
          id ? "editar" : "salvar"
        } o modelo. Tente novamente mais tarde.`,
        state: "error",
        visible: true,
      })
    }

    setSubmitting(false)
  }

  const handleField = useCallback((field: string, value: any) => {
    setModel((p) => ({ ...p, [field]: value }))
  }, [])

  // # Initial loading

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const params = id ? { modelId: id } : null

      const req = await Api.formBare.model(params ?? {})

      if (req.ok) {
        const modelInfo = req.data.model

        const newOptions: { [key: string]: TRoOption[] } = {
          prodTypes: parseRoOption(req.data.prodTypes, "name", "code"),
          colors: parseRoOption(req.data.colors, "name", "code"),
        }

        if (modelInfo) setModel(modelInfo.model)
        else {
          setModel((mdl) => ({
            ...mdl,
            type:
              newOptions.prodTypes.length === 0
                ? ""
                : newOptions.prodTypes[0].key,
          }))
        }

        setOptions((opts) => ({
          ...opts,
          ...newOptions,
        }))

        setAllowedColors(
          req.data.colors.map((c) => ({
            ...c,
            checked: modelInfo
              ? modelInfo.model.colors.includes(c.code)
              : false,
          }))
        )

        setVariations(req.data.model ? req.data.model.variations : [])
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um erro ao carregar as informações. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
      navigate(-1)
    }

    setTimeout(() => {
      setLoading(false)
    }, 400)
  }, [controllers.feedback, id, navigate])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Renders
  const renderColorsControl = () => {
    let columns: any[] = []

    const cols = 4
    const perColumn = 4

    for (let i = 0; i < Math.ceil(allowedColors.length / cols); i++) {
      columns.push(
        <Grid2 container direction={"column"} gap={1}>
          {allowedColors
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(i * perColumn, (i + 1) * perColumn)
            .map((item, itemKey) => (
              <Grid2 key={itemKey} container direction={"row"}>
                <Typography
                  width={180}
                  fontWeight={300}
                  sx={{
                    transition: "color 0.3s ease",
                    color: (theme) =>
                      item.checked
                        ? theme.palette.neutral[100]
                        : theme.palette.neutral[300],
                  }}
                >
                  {item.name}
                </Typography>
                <Input.ColorCheckbox
                  checked={item.checked}
                  onChange={() => toggleColor(item.code)}
                />
              </Grid2>
            ))}
        </Grid2>
      )
    }

    return columns
  }

  return (
    <S.Content>
      <Modal.Loading showing={loading} closeFn={() => {}} />
      <PageHead
        title={"Modelos"}
        forForm={true}
        subtitle={`${id ? "Edição" : "Cadastro"}`}
      />

      {/* form */}
      <S.FormGroup>
        <S.GroupTitle>Informações gerais</S.GroupTitle>
        <S.FormLine
          style={{
            alignItems: "flex-end",
          }}
        >
          <Input.Select
            label="Tipo"
            onChange={(v) => handleField("type", v)}
            value={model.type}
            roOptions={options.prodTypes}
            showValueFromKey={true}
          />
          <Input.Default
            label="Nome do modelo"
            onChange={(v) => handleField("name", v)}
            value={model.name}
          />
          <Input.Default
            label="Código"
            onChange={(v) => handleField("code", v)}
            value={model.code}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Informações de venda</S.GroupTitle>
        <S.FormLine>
          <Input.Monetary
            label="Preço Unitário"
            onChange={(v) => handleField("price", v)}
            value={model.price}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Cores</S.GroupTitle>
        <S.FormLine
          style={{
            minWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {renderColorsControl()}
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Variações do modelo</S.GroupTitle>
        <S.FormLine style={{ minWidth: "100%" }}>
          <Table
            config={tableConfig.modelVariations}
            data={variations}
            noHover={true}
          />
        </S.FormLine>
      </S.FormGroup>

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
    </S.Content>
  )
}

export default ModelForm

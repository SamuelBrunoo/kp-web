import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"
import { TModel, TNewModel } from "../../../utils/@types/data/model"
import { initialForm } from "../../../utils/initialData/form"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { tableConfig } from "../../../utils/sys/table"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"
import Table from "../../../component/Table"
import getStore from "../../../store"

const ModelForm = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const navigate = useNavigate()

  const [model, setModel] = useState<Partial<TModel>>(initialForm.model as any)
  const [allowedColors, setAllowedColors] = useState<any[]>([])
  const [variations, setVariations] = useState<any[]>([])

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
    if (id) {
      // edit ...
      const cls = allowedColors
        .map((ac) => (ac.checked ? ac.code : null))
        .filter((ac) => ac)

      const update = await Api.update.model({ ...model, colors: cls } as TModel)

      if (update.success) {
        controllers.feedback.setData({
          message: "Modelo atualizado com sucesso",
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
    } else {
      const cls = allowedColors
        .map((ac) => (ac.checked ? ac.code : null))
        .filter((ac) => ac)

      const create = await Api.new.model({ ...model, colors: cls } as TNewModel)

      if (create.success) {
        controllers.feedback.setData({
          message: "Modelo adicionado com sucesso",
          state: "success",
          visible: true,
        })
        navigate(-1)
      }
    }
  }

  const handleField = useCallback((field: string, value: any) => {
    setModel((p) => ({ ...p, [field]: value }))
  }, [])

  // # Initial loading

  const loadData = useCallback(async () => {
    try {
      const reqProdTypes = await Api.get.productTypes({})
      const reqColors = await Api.get.colors({})

      if (reqProdTypes.success && reqColors.success) {
        const piProdTypes = reqProdTypes.data.list
        const piColors = reqColors.data.list

        const opts = {
          prodTypes: parseRoOption(piProdTypes, "name", "code"),
          colors: parseRoOption(piColors, "name", "code"),
        }

        setOptions((o) => ({ ...o, ...opts }))

        if (id) {
          const pInfo = await Api.get.model({ id })

          if (pInfo.success) {
            const { model: modelData, variations: variationsList } = pInfo.data

            setModel(modelData)
            setVariations(variationsList)

            setAllowedColors(
              piColors.map((c) => ({
                ...c,
                checked: modelData.colors.includes(c.code),
              }))
            )
          }
        } else {
          setModel((p) => ({
            ...p,
            hasStorage: options.storage[0].key,
            type: opts.prodTypes[0]?.key,
          }))

          setAllowedColors(piColors.map((c) => ({ ...c, checked: true })))
        }
      }
    } catch (error) {
      alert("Tente novamente mais tarde")
    }
  }, [id, options.storage])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Renders
  const renderColorsControl = () => {
    let tables: any[] = []

    for (let i = 0; i < Math.ceil(allowedColors.length / 6); i++) {
      tables.push(
        <Table
          key={i}
          config={tableConfig.colors}
          data={allowedColors
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(i * 6, (i + 1) * 6)}
          actions={[toggleColor]}
          noHover={true}
        />
      )
    }

    return tables
  }

  return (
    <S.Content>
      <PageHead
        title={"Modelos"}
        subtitle={`${id ? "Edição" : "Cadastro"}`}
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
            value={model.type}
            roOptions={options.prodTypes}
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
        <S.FormLine style={{ minWidth: "100%" }}>
          {renderColorsControl()}
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Variações do modelo</S.GroupTitle>
        <S.FormLine style={{ minWidth: "100%" }}>
          <Table config={tableConfig.modelVariations} data={variations} />
        </S.FormLine>
      </S.FormGroup>
    </S.Content>
  )
}

export default ModelForm

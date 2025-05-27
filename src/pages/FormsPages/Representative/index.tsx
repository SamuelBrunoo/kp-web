/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../components/PageHead"

import { initialForm } from "../../../utils/initialData/form"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatPhone } from "../../../utils/helpers/formatters/phone"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import LoadingModal from "../../../components/Modal/variations/Loading"
import Button from "../../../components/Button"
import getStore from "../../../store"
import Form from "../../../components/Form"
import {
  TNewRepresentative,
  TRepresentative,
} from "../../../utils/@types/data/representative"
import { states } from "../../../utils/sys/states"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/sys/table"
import { FormField } from "../../../utils/@types/components/FormFields"
import { checkErrors } from "../../../utils/helpers/checkErrors"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"

const RepresentativesForm = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [representative, setRepresentative] = useState<
    TNewRepresentative | TRepresentative
  >(initialForm.representative as any)
  const [errors, setErrors] = useState<TErrorsCheck>({ has: false, fields: [] })

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    states: states,
    representatives: [],
    commissionTypes: [
      { key: "percentage", value: "Percentual" },
      { key: "fixed", value: "Fixa" },
    ],
    paymentMethods: [
      { key: "pix", value: "Pix" },
      { key: "ted", value: "TED" },
      { key: "check", value: "Cheque" },
      { key: "slip", value: "Boleto" },
    ],
    paymentPeriod: [
      { key: "monthly", value: "Mensal" },
      { key: "dualweek", value: "Quinzenal" },
    ],
    dateLimit: [
      { key: "15", value: "Dia 15" },
      { key: "25", value: "Dia 25" },
    ],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const updateErrors = () => {
    const check = checkErrors.representative(representative)
    return check
  }

  const getObj: () => TNewRepresentative | TRepresentative = () => {
    const info: TNewRepresentative | TRepresentative = {
      ...(representative as TNewRepresentative),
      phone: representative.phone.replace(/\D/g, ""),
      phone2: representative.phone2.replace(/\D/g, ""),
      registers: {
        cpf: representative.registers.cpf.replace(/\D/g, ""),
        cnpj: representative.registers.cnpj.replace(/\D/g, ""),
      },
      paymentConfig: {
        ...representative.paymentConfig,
        value: +String(representative.paymentConfig.value).replace(/\D/g, ""),
      },
    }
    return info
  }

  const handleSave = async () => {
    setSubmitting(true)

    const errorCheck = updateErrors()

    if (!errorCheck.has) {
      const obj = getObj()

      if (id) {
        const update = await Api.representatives.updateRepresentative({
          representative: obj as TRepresentative,
        })
        if (update.ok) {
          controllers.feedback.setData({
            message: "Representante atualizado com sucesso",
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
        const create = await Api.representatives.createRepresentative({
          newRepresentative: obj,
        })
        if (create.ok) {
          controllers.feedback.setData({
            message: "Representante cadastrado com sucesso",
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
    } else {
      setErrors(errorCheck)
    }

    setSubmitting(false)
  }

  const updateErrorsField = (field: string) => {
    if (errors.fields.includes(field)) {
      const newFieldsList = [...errors.fields].filter(
        (errorItem) => errorItem !== field
      )

      const newErrors = { fields: newFieldsList, has: newFieldsList.length > 0 }

      setErrors(newErrors)
    }
  }

  const handleField = useCallback(
    (field: string, value: any) => {
      updateErrorsField(field)

      if (field === "cnpj") {
        value = formatCnpj(value)
        setRepresentative((c) => ({ ...c, [field]: value }))
      } else if (field === "cpf") {
        value = formatCpf(value)
        setRepresentative((c) => ({ ...c, [field]: value }))
      } else if (field.includes("registers.")) {
        const realField = field.split(".")[1]

        value = realField === "cpf" ? formatCpf(value) : formatCnpj(value)

        setRepresentative((c) => ({
          ...c,
          registers: { ...c.registers, [realField]: value },
        }))
      } else if (["phone", "phone2"].includes(field)) {
        value = formatPhone(value)
        setRepresentative((c) => ({ ...c, [field]: value }))
      } else if (field.includes("address.")) {
        const realField = field.split(".")[1]

        if (realField === "cep") value = formatCep(value)

        setRepresentative((c) => ({
          ...c,
          address: { ...c.address, [realField]: value },
        }))
      } else if (field.includes("commission.")) {
        const realField = field.split(".")[1]

        setRepresentative((c) => ({
          ...c,
          paymentConfig: { ...c.paymentConfig, [realField]: value },
        }))
      } else setRepresentative((c) => ({ ...c, [field]: value }))
    },
    [errors]
  )

  // # Initial loading

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.formBare.representative({ representativeId: id })

      if (req.ok) {
        const newOptions = {
          ...options,
          states: parseRoOption(req.data.states, "name", "id"),
        }

        setOptions(newOptions)

        if (req.data.representative) setRepresentative(req.data.representative)
        else
          setRepresentative((client) => ({
            ...client,
            state: newOptions.states.length > 0 ? newOptions.states[0].key : "",
          }))
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "alert",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível carregar as informações necessárias. Tente novamente mais tarde.",
        state: "alert",
        visible: true,
      })
      navigate(-1)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    let str = ""

    const stateName = (
      options.states.find((i) => i.key === representative.address.state) ?? {
        value: "Não definido",
      }
    )?.value

    if (!!representative.address.street) str += representative.address.street
    if (!!representative.address.number)
      str += `, nº${representative.address.number}`
    if (!!representative.address.neighborhood)
      str += `, ${representative.address.neighborhood}`

    if (!!representative.address.city)
      str += ` - ${representative.address.city}`
    if (!!representative.address.city && !!representative.address.state)
      str += `, ${stateName}`

    if (representative.address.full !== str)
      setRepresentative((c) => ({ ...c, address: { ...c.address, full: str } }))
  }, [representative.address])

  const handleDelete = async () => {
    setDeleting(true)

    try {
      if (id) {
        const req = await Api.representatives.deleteRepresentative({ id })

        if (req.ok) {
          controllers.feedback.setData({
            message: "Representante deletado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        } else {
          controllers.feedback.setData({
            message: req.error.message,
            state: "alert",
            visible: true,
          })
        }
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Ops! Houve um problema. Tente novamente mais tarde.",
        state: "alert",
        visible: true,
      })
    }

    setDeleting(false)
  }

  return (
    <S.Content>
      <LoadingModal visible={loading} />

      <PageHead
        title={"Representantes"}
        subtitle={`${id ? "Edição" : "Cadastro"}`}
        forForm={true}
        withoutNewButton={true}
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
                    columns: 8,
                    fields: [
                      {
                        type: "default",
                        field: "name",
                        value: representative.name,
                        label: "Nome do representante",
                        gridSizes: { big: 2, small: 12 },
                        error: {
                          has: errors.fields.includes("name"),
                          message: "Digite o nome",
                        },
                      },
                      [
                        {
                          type: "default",
                          field: "email",
                          value: representative.email,
                          label: "Email",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("email"),
                            message: "Digite o email",
                          },
                        },
                        {
                          type: "default",
                          field: "phone",
                          value: formatPhone(representative.phone),
                          label: "Telefone",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("phone"),
                            message: `Digite um telefone ${
                              representative.phone.length > 0 ? "válido" : ""
                            }`,
                          },
                        },
                        {
                          type: "default",
                          field: "phone2",
                          value: formatPhone(representative.phone2),
                          label: "Telefone 2",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("phone2"),
                            message: `Digite um telefone ${
                              representative.phone2.length > 0 ? "válido" : ""
                            }`,
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "fields",
                    title: "Pagamentos",
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "select",
                          field: "commission.commissionType",
                          options: options.commissionTypes,
                          value: representative.paymentConfig.commissionType,
                          label: "Tipo da comissão",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "default",
                          field: "commission.value",
                          value:
                            representative.paymentConfig.commissionType ===
                            "fixed"
                              ? formatMoney(
                                  Number(
                                    String(
                                      representative.paymentConfig.value
                                    ).replace(/\D/g, "")
                                  ) ?? "0"
                                )
                              : `% ${
                                  Number(
                                    String(
                                      representative.paymentConfig.value
                                    ).replace(/\D/g, "")
                                  ) ?? "0"
                                }`,
                          label: "Valor da comissão",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("commission.value"),
                            message: "Valor mín: 1%",
                          },
                        },
                        {
                          type: "select",
                          field: "commission.paymentMethod",
                          options: options.paymentMethods,
                          value: representative.paymentConfig.paymentMethod,
                          label: "Forma de pagamento",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "default",
                          field: "commission.paymentAddress",
                          value: representative.paymentConfig.paymentAddress,
                          label: "Nº da conta ou cód. Pix",
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                      [
                        {
                          type: "select",
                          field: "commission.period",
                          options: options.paymentPeriod,
                          value: representative.paymentConfig.period,
                          label: "Período",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "select",
                          field: "commission.dateLimit",
                          options: options.dateLimit,
                          value: representative.paymentConfig.dateLimit
                            ? String(representative.paymentConfig.dateLimit)
                            : "15",
                          label: "Data Limite",
                          gridSizes: { big: 2, small: 6 },
                        },
                        ...((representative.paymentConfig.period === "dualweek"
                          ? [
                              {
                                type: "select",
                                field: "commission.dateLimit2",
                                options: options.dateLimit,
                                value: representative.paymentConfig.dateLimit2
                                  ? String(
                                      representative.paymentConfig.dateLimit2
                                    )
                                  : "15",
                                label: "Data Limite 2",
                                gridSizes: { big: 2, small: 6 },
                              },
                            ]
                          : []) as FormField[]),
                      ],
                    ],
                  },
                  {
                    title: "Documentações",
                    type: "fields",
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "default",
                          value: formatCpf(representative.registers.cpf),
                          field: "registers.cpf",
                          label: "CPF",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("registers.cpf"),
                            message: "Digite um cpf válido",
                          },
                        },
                        {
                          type: "default",
                          value: formatCnpj(
                            representative.registers.cnpj ?? ""
                          ),
                          field: "registers.cnpj",
                          label: "CNPJ",
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("registers.cnpj"),
                            message: "Digite um cnpj válido",
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "fields",
                    title: "Endereço",
                    columns: 12,
                    fields: [
                      {
                        type: "readonly",
                        field: "address",
                        value: !!representative.address.full
                          ? representative.address.full
                          : "O endereço vai aparecer aqui",
                        label: "Endereço completo",
                        gridSizes: { big: 12 },
                      },
                      [
                        {
                          type: "select",
                          field: "address.state",
                          value: representative.address.state,
                          options: options.states,
                          label: "Estado",
                          gridSizes: { big: 2, small: 12 },
                          error: {
                            has: errors.fields.includes("address.state"),
                            message: "Escolha uma UF",
                          },
                        },
                        {
                          type: "default",
                          field: "address.city",
                          value: representative.address.city,
                          label: "Cidade",
                          gridSizes: { big: 2, small: 7 },
                          error: {
                            has: errors.fields.includes("address.city"),
                            message: "Digite o nome da cidade",
                          },
                        },
                        {
                          type: "default",
                          field: "address.cep",
                          value: formatCep(representative.address.cep),
                          label: "CEP",
                          gridSizes: { big: 2, small: 5 },
                          error: {
                            has: errors.fields.includes("address.cep"),
                            message: "Digite o CEP",
                          },
                        },
                      ],
                      [
                        {
                          type: "default",
                          field: "address.neighborhood",
                          value: representative.address.neighborhood,
                          label: "Bairro",
                          gridSizes: { big: 2, small: 12 },
                          error: {
                            has: errors.fields.includes("address.neighborhood"),
                            message: "Digite o bairro",
                          },
                        },
                        {
                          type: "default",
                          field: "address.street",
                          value: representative.address.street,
                          label: "Rua",
                          gridSizes: { big: 2, small: 5 },
                          error: {
                            has: errors.fields.includes("address.street"),
                            message: "Digite o nome da rua",
                          },
                        },
                        {
                          type: "default",
                          field: "address.number",
                          value: representative.address.number,
                          label: "Número",
                          gridSizes: { big: 2, small: 7 },
                          error: {
                            has: errors.fields.includes("address.number"),
                            message: "Digite um número válido",
                          },
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "custom",
                    title: "Clientes",
                    columns: 12,
                    element: (
                      <Table
                        config={tableConfig.representativeClients}
                        data={
                          // @ts-ignore
                          representative.clients ? representative.clients : []
                        }
                        noHover={true}
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

export default RepresentativesForm

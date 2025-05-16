/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../components/PageHead"

import { initialForm } from "../../../utils/initialData/form"
import {
  TNewClient,
  TBaseClient,
  TClientType,
  TClient,
} from "../../../utils/@types/data/client"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatPhone } from "../../../utils/helpers/formatters/phone"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import LoadingModal from "../../../components/Modal/variations/Loading"
import Button from "../../../components/Button"
import getStore from "../../../store"
import Form from "../../../components/Form"
import { FormField } from "../../../utils/@types/components/FormFields"

const ClientsForm = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [client, setClient] = useState<TNewClient | TBaseClient>(
    initialForm.client as any
  )

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    clientType: [
      { key: "juridical", value: "Pessoa Jurídica" },
      { key: "physical", value: "Pessoa Física" },
    ],
    states: [],
    representatives: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const getNewClientData = () => {
    const d: TNewClient = {
      ...client,
      phone1: client.phone1.replace(/\D/g, ""),
      phone2: client.phone2.replace(/\D/g, ""),
      documents: {
        register: client.documents.register.replace(/\D/g, ""),
        stateInscription: client.documents.stateInscription.replace(/\D/g, ""),
        cityInscription: client.documents.cityInscription.replace(/\D/g, ""),
      },
    }

    return d
  }

  const handleSave = async () => {
    setSubmitting(true)

    if (id) {
      // edit ...
      const update = await Api.clients.updateClient({
        client: client as TClient,
      })
      if (update.ok) {
        controllers.feedback.setData({
          message: "Cliente atualizado com sucesso",
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
      const create = await Api.clients.createClient({
        newClient: getNewClientData(),
      })
      if (create.ok) {
        controllers.feedback.setData({
          message: "Cliente cadastrado com sucesso",
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

    setSubmitting(false)
  }

  const handleField = useCallback((field: string, value: any) => {
    if (field === "cnpj") {
      value = formatCnpj(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field === "cpf") {
      value = formatCpf(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field === "documents.register") {
      const realField = field.split(".")[1]

      value = client.type === "physical" ? formatCpf(value) : formatCnpj(value)
      setClient((c) => ({
        ...c,
        documents: { ...c.documents, [realField]: value },
      }))
    } else if (field === "documents.stateInscription") {
      const realField = field.split(".")[1]

      value = formatStateRegister(value)
      setClient((c) => ({
        ...c,
        documents: { ...c.documents, [realField]: value },
      }))
    } else if (["phone1", "phone2"].includes(field)) {
      value = formatPhone(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field.includes("address.")) {
      const realField = field.split(".")[1]

      if (realField === "cep") value = formatCep(value)

      setClient((c) => ({
        ...c,
        address: { ...c.address, [realField]: value },
      }))
    } else setClient((c) => ({ ...c, [field]: value }))
  }, [])

  // # Initial loading

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.formBare.client({ clientId: id })

      if (req.ok) {
        const newOptions = {
          clientType: options.clientType as TRoOption[],
          states: parseRoOption(req.data.states, "name", "id"),
          representatives: parseRoOption(
            req.data.representatives,
            "name",
            "id"
          ),
        }

        setOptions(newOptions)

        if (req.data.client) setClient(req.data.client)
        else
          setClient((client) => ({
            ...client,
            type: newOptions.clientType[0].key as TClientType,
            representative:
              newOptions.representatives.length > 0
                ? newOptions.representatives[0].key
                : "",
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
      options.states.find((i) => i.key === client.address.state) ?? {
        value: "Não definido",
      }
    )?.value

    if (!!client.address.street) str += client.address.street
    if (!!client.address.number) str += `, nº${client.address.number}`
    if (!!client.address.neighborhood) str += `, ${client.address.neighborhood}`

    if (!!client.address.city) str += ` - ${client.address.city}`
    if (!!client.address.city && !!client.address.state) str += `, ${stateName}`

    if (client.address.full !== str)
      setClient((c) => ({ ...c, address: { ...c.address, full: str } }))
  }, [client.address])

  const handleDelete = async () => {
    setDeleting(true)

    try {
      if (id) {
        const req = await Api.clients.deleteClient({ id })

        if (req.ok) {
          controllers.feedback.setData({
            message: "Cliente deletado com sucesso",
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
        title={"Clientes"}
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
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "select",
                          field: "type",
                          options: options.clientType,
                          value: client.type,
                          label: "Tipo do cliente",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "select",
                          field: "representative",
                          options: options.representatives,
                          value: client.representative,
                          label: "Representante",
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                      [
                        {
                          type: "default",
                          field: "clientName",
                          value: client.clientName,
                          label: "Nome do cliente",
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "default",
                          field: "socialRole",
                          value: client.socialRole,
                          label: "Razão social",
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "default",
                          field: "personName",
                          value: client.personName,
                          label: "Proprietário(a)",
                          gridSizes: { big: 2, small: 12 },
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Informações de contato",
                    columns: 12,
                    fields: [
                      [
                        {
                          type: "default",
                          field: "email",
                          value: client.email,
                          label: "Email",
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "default",
                          field: "phone1",
                          value: formatPhone(client.phone1),
                          label: "Telefone 1",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "default",
                          field: "phone2",
                          value: formatPhone(client.phone2),
                          label: "Telefone 2",
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Documentações",
                    columns: 12,
                    fields: [
                      (client.type === "physical"
                        ? [
                            {
                              type: "default",
                              field: "documents.register",
                              value: formatCpf(client.documents.register),
                              label: "CPF",
                              gridSizes: { big: 2, small: 12 },
                            },
                          ]
                        : [
                            {
                              type: "default",
                              field: "documents.register",
                              value: formatCnpj(client.documents.register),
                              label: "CNPJ",
                              gridSizes: { big: 2, small: 6 },
                            },
                            {
                              type: "default",
                              field: "documents.stateInscription",
                              value: formatStateRegister(
                                client.documents.stateInscription
                              ),
                              label: "Inscrição estadual",
                              gridSizes: { big: 2, small: 6 },
                            },
                          ]) as FormField[],
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Informações de envio",
                    columns: 12,
                    fields: [
                      {
                        type: "readonly",
                        field: "address",
                        value: !!client.address.full
                          ? client.address.full
                          : "O endereço vai aparecer aqui",
                        label: "Endereço completo",
                        gridSizes: { big: 12 },
                      },
                      [
                        {
                          type: "select",
                          field: "address.state",
                          value: client.address.state,
                          options: options.states,
                          label: "Estado",
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "default",
                          field: "address.city",
                          value: client.address.city,
                          label: "Cidade",
                          gridSizes: { big: 2, small: 7 },
                        },
                        {
                          type: "default",
                          field: "address.cep",
                          value: formatCep(client.address.cep),
                          label: "CEP",
                          gridSizes: { big: 2, small: 5 },
                        },
                      ],
                      [
                        {
                          type: "default",
                          field: "address.neighborhood",
                          value: client.address.neighborhood,
                          label: "Bairro",
                          gridSizes: { big: 2, small: 12 },
                        },
                        {
                          type: "default",
                          field: "address.street",
                          value: client.address.street,
                          label: "Rua",
                          gridSizes: { big: 2, small: 5 },
                        },
                        {
                          type: "default",
                          field: "address.number",
                          value: client.address.number,
                          label: "Número",
                          gridSizes: { big: 2, small: 7 },
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

export default ClientsForm

/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"

import { initialForm } from "../../../utils/initialData/form"
import {
  TNewClient,
  TBaseClient,
  TClientType,
} from "../../../utils/@types/data/client"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatPhone } from "../../../utils/helpers/formatters/phone"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import Modal from "../../../component/Modal"
import Button from "../../../component/Button"
import getStore from "../../../store"

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
      personName: client.clientName,
      type: client.type,
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
        client: client as TBaseClient,
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

    if (!!client.address.street) str += client.address.street
    if (!!client.address.number) str += `, nº${client.address.number}`
    if (!!client.address.neighborhood) str += `, ${client.address.neighborhood}`

    if (!!client.address.city) str += ` - ${client.address.city}`
    if (!!client.address.city && !!client.address.state)
      str += `, ${client.address.state}`

    if (client.address.full !== str)
      setClient((c) => ({ ...c, address: { ...c.address, full: str } }))
  }, [client.address])

  const handleDelete = async () => {
    setDeleting(true)

    try {
      if (id) {
        const req = await Api.products.deleteProduct({ id })

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
      <Modal.Loading showing={loading} closeFn={() => {}} />

      <PageHead
        title={"Clientes"}
        subtitle={`${id ? "Edição" : "Cadastro"} de cliente`}
      />

      {/* form */}
      <S.FormGroup>
        <S.GroupTitle>Informações gerais</S.GroupTitle>
        <S.FormLine style={{ alignItems: "flex-end" }}>
          <Input.Select
            label="Tipo de cliente"
            onChange={(v) => handleField("type", v)}
            value={client.type}
            roOptions={options.clientType}
          />
          <Input.Default
            label="Nome do cliente"
            value={client.clientName}
            onChange={(v) => handleField("clientName", v)}
          />
          {client.type === "juridical" && (
            <Input.Default
              label="Nome da empresa"
              value={client.socialRole}
              onChange={(v) => handleField("socialRole", v)}
            />
          )}
        </S.FormLine>
        {client.type === "physical" ? (
          <S.FormLine>
            <Input.Default
              label="CPF"
              onChange={(v) => handleField("documents.register", v)}
              value={client.documents.register}
            />
          </S.FormLine>
        ) : (
          <S.FormLine>
            <Input.Default
              label="CNPJ"
              onChange={(v) => handleField("documents.register", v)}
              value={client.documents.register}
            />
            <Input.Default
              label="Inscrição Estadual"
              onChange={(v) => handleField("documents.stateInscription", v)}
              value={client.documents.stateInscription}
            />
          </S.FormLine>
        )}
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Informações de contato</S.GroupTitle>
        <S.FormLine>
          <Input.Default
            label="Email"
            value={client.email}
            onChange={(v) => handleField("email", v)}
          />
          <Input.Default
            label="Telefone"
            value={client.phone1}
            onChange={(v) => handleField("phone1", v)}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Informações de envio</S.GroupTitle>
        <S.FormLine>
          <Input.Readonly
            label="Endereço completo"
            value={
              !!client.address.full
                ? client.address.full
                : "Seu endereço completo aparecerá aqui"
            }
          />
        </S.FormLine>
        <S.FormLine style={{ alignItems: "flex-end" }}>
          <Input.Select
            label="Estado"
            onChange={(v) => handleField("address.state", v)}
            value={client.address.state}
            roOptions={options.states}
          />
          <Input.Default
            label="Cidade"
            value={client.address.city}
            onChange={(v) => handleField("address.city", v)}
          />
          <Input.Default
            label="CEP"
            value={client.address.cep}
            onChange={(v) => handleField("address.cep", v)}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Default
            label="Bairro"
            value={client.address.neighborhood}
            onChange={(v) => handleField("address.neighborhood", v)}
          />
          <Input.Default
            label="Rua"
            onChange={(v) => handleField("address.street", v)}
            value={client.address.street}
          />
          <Input.Default
            label="Número"
            value={client.address.number}
            onChange={(v) => handleField("address.number", v)}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Relações de Vendas</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Representante"
            onChange={(v) => handleField("representative", v)}
            value={client.representative}
            roOptions={options.representatives}
          />
        </S.FormLine>
      </S.FormGroup>

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

/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"

import { initialForm } from "../../../utils/initialData/form"
import { TNewClient, TClient } from "../../../utils/@types/data/client"
import { states } from "../../../utils/sys/states"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatPhone } from "../../../utils/helpers/formatters/phone"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"

const ClientsForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [client, setClient] = useState<TNewClient | TClient>(
    initialForm.client as any
  )

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    clientType: [
      { key: "phisical", value: "Pessoa Física" },
      { key: "juridical", value: "Pessoa Jurídica" },
    ],
    states: [],
    representatives: [],
  })

  const [clientType, setClientType] = useState("juridical")

  const handleCancel = () => {
    navigate(-1)
  }

  const getNewClientData = () => {
    const d: TNewClient = {
      ...client,
      phone: client.phone.replace(/\D/g, ""),
      stateRegister: client.stateRegister.replace(/\D/g, ""),
      cpf: client.cpf?.replace(/\D/g, ""),
      cnpj: client.cnpj?.replace(/\D/g, ""),
    }

    return d
  }

  const parseClientData = (info: TClient) => {
    const d: TClient = {
      ...info,
      phone: formatPhone(info.phone),
      stateRegister: formatStateRegister(info.stateRegister),
      cpf: formatCpf(info.cpf ?? ""),
      cnpj: formatCnpj(info.cnpj ?? ""),
    }

    return d
  }

  const handleSave = async () => {
    if (id) {
      // edit ...
      const update = await Api.update.client(client as TClient)
      if (update.success) navigate(-1)
    } else {
      const create = await Api.new.client(getNewClientData())
      if (create.success) navigate(-1)
    }
  }

  const handleField = useCallback((field: string, value: any) => {
    if (field === "cnpj") {
      value = formatCnpj(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field === "cpf") {
      value = formatCpf(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field === "stateRegister") {
      value = formatStateRegister(value)
      setClient((c) => ({ ...c, [field]: value }))
    } else if (field === "phone") {
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
    try {
      const repReq = await Api.get.representatives({})

      if (repReq.success) {
        setOptions((opts) => ({
          ...opts,
          states: states,
          representatives: parseRoOption(repReq.data.list, "name", "id"),
        }))

        if (id) {
          const pInfo = await Api.get.client({ id })
          setTimeout(() => {
            if (pInfo.success) {
              const c = parseClientData(pInfo.data.client)

              setClient(c)
            }
          }, 150)
        }
      } else throw new Error()
    } catch (error) {
      alert("Tente novamente mais tarde")
      navigate(-1)
    }
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

  return (
    <S.Content>
      <PageHead
        title={"Clientes"}
        subtitle={`${id ? "Edição" : "Cadastro"} de cliente`}
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
            label="Tipo de cliente"
            onChange={setClientType}
            value={clientType}
            roOptions={options.clientType}
          />
          <Input.Default
            label="Nome do cliente"
            value={client.name}
            onChange={(v) => handleField("name", v)}
          />
          {clientType === "juridical" && (
            <Input.Default
              label="Nome da empresa"
              value={client.socialRole}
              onChange={(v) => handleField("socialRole", v)}
            />
          )}
        </S.FormLine>
        {clientType === "phisical" ? (
          <S.FormLine>
            <Input.Default
              label="CPF"
              onChange={(v) => handleField("cpf", v)}
              value={client.cpf}
            />
          </S.FormLine>
        ) : (
          <S.FormLine>
            <Input.Default
              label="CNPJ"
              onChange={(v) => handleField("cnpj", v)}
              value={client.cnpj}
            />
            <Input.Default
              label="Inscrição Estadual"
              onChange={(v) => handleField("stateRegister", v)}
              value={client.stateRegister}
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
            label="Phone"
            value={client.phone}
            onChange={(v) => handleField("phone", v)}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Informações de envio</S.GroupTitle>
        <S.FormLine>
          <Input.Readonly
            label="Endereço completo"
            value={
              client.address.full ?? "Seu endereço completo aparecerá aqui"
            }
          />
        </S.FormLine>
        <S.FormLine>
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
          <Input.Default
            label="Bairro"
            value={client.address.neighborhood}
            onChange={(v) => handleField("address.neighborhood", v)}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Default
            label="CEP"
            value={client.address.cep}
            onChange={(v) => handleField("address.cep", v)}
          />
          <Input.Default
            label="Cidade"
            value={client.address.city}
            onChange={(v) => handleField("address.city", v)}
          />
          <Input.Select
            label="Estado"
            onChange={(v) => handleField("address.state", v)}
            value={client.address.state}
            roOptions={options.states}
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
    </S.Content>
  )
}

export default ClientsForm

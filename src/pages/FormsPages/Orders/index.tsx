/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../component/PageHead"
import Input from "../../../component/Inpts"

import { initialForm } from "../../../utils/initialData/form"
import { TClient } from "../../../utils/@types/data/client"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { TNewOrder, TOrder } from "../../../utils/@types/data/order"
import icons from "../../../assets/icons"
import Table from "../../../component/Table"
import { tableConfig } from "../../../utils/sys/table"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { payments } from "../../../utils/sys/payments"
import Modal from "../../../component/Modal"
import { TProduct } from "../../../utils/@types/data/product"
import { TProductType } from "../../../utils/@types/data/productType"
import { TColor } from "../../../utils/@types/data/color"
import { TModel } from "../../../utils/@types/data/model"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import AdditionalInfo from "../../../component/AdditionalInfo"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { parseDate } from "../../../utils/helpers/formatters/date"

const OrdersForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [order, setOrder] = useState<TNewOrder | TOrder>(
    initialForm.order as any
  )

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    clients: [],
    representatives: [],
    payments: [],
    emmitters: [],
  })

  const [prodTypes, setProdTypes] = useState<TProductType[]>([])
  const [models, setModels] = useState<TModel[]>([])
  const [colors, setColors] = useState<TColor[]>([])

  const [clients, setClients] = useState<TClient[]>([])
  const [productsList, setProdList] = useState<TProduct[]>([])
  const [selectedClient, setSelectedClient] = useState<TClient | null>(null)
  const [showingModal, setShowingModal] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    if (id) {
      // edit ...
      const update = await Api.update.order(order as TOrder)
      if (update.success) navigate(-1)
    } else {
      const create = await Api.new.order(order as TNewOrder)
      if (create.success) navigate(-1)
    }
  }

  const handleField = useCallback((field: string, value: any) => {
    if (field === "client") {
      setSelectedClient(clients.find((c) => c.id === value) as TClient)
    } else if (field === "payment") {
      field = "payment.type"
    }

    setOrder((c) => ({ ...c, [field]: value }))
  }, [])

  const toggleModal = () => setShowingModal(!showingModal)

  const addProduct = (product: TProduct, quantity: number) => {
    const m = models.find((m) => m.code === product.model) as TModel

    const parsedProd: TProduct = {
      ...product,
      model: m.name,
      color: colors.find((c) => c.code === product.color)?.name as string,
      price: m.price,
    }

    const obj: TNewOrder["products"][number] = {
      ...parsedProd,
      quantity: quantity,
      status: "queued",
    }

    // if id already included, sum qnts.

    setOrder((ord) => ({ ...ord, products: [...ord.products, obj] }))

    toggleModal()
  }

  const deleteCallback = (id: string) => {
    setOrder((ord) => ({
      ...ord,
      products: ord.products.filter((m) => m.id !== id),
    }))
  }

  const toggleProductsModal = () => {
    setShowingModal(!showingModal)
  }

  // # Initial loading

  const loadData = useCallback(async () => {
    try {
      const req = await Api.pageInfo.orderForm({})

      if (req.success) {
        const pageInfo = req.data

        handleField("payment", "pix")
        handleField("emmitter", pageInfo.emmitters[0].id)

        setClients(pageInfo.clients)
        setProdList(pageInfo.products)

        setProdTypes(pageInfo.prodTypes)
        setModels(pageInfo.models)
        setColors(pageInfo.colors)

        setOptions((opts) => ({
          ...opts,
          clients: parseRoOption(pageInfo.clients, "name", "id"),
          representatives: parseRoOption(
            pageInfo.representatives,
            "name",
            "id"
          ),
          emmitters: parseRoOption(pageInfo.emmitters, "name", "id"),
          payments: Object.entries(payments).map((p) => ({
            key: p[0],
            value: p[1],
          })),
        }))

        if (id) {
          const orderInfo = await Api.get.order({ id })
          setTimeout(() => {
            if (orderInfo.success) {
              setOrder(orderInfo.data.order)
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

  return (
    <S.Content>
      <Modal.AddOrderProduct
        showing={showingModal}
        closeFn={toggleProductsModal}
        onSave={addProduct}
        data={{
          prodTypes,
          colors,
          models,
          products: productsList,
        }}
      />

      <PageHead
        title={"Pedidos"}
        subtitle={`${id ? "Edição" : "Cadastro"} de pedido`}
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
        <S.GroupTitle>Comprador</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Cliente"
            onChange={(v) => handleField("client", v)}
            value={order.client}
            roOptions={options.clients}
            avoidAutoSelect={true}
          />
          <Input.Readonly
            label={selectedClient?.type === "phisical" ? "CPF" : "CNPJ"}
            value={
              selectedClient?.type === "phisical"
                ? formatCpf(selectedClient?.cpf ?? "")
                : formatCnpj(selectedClient?.cnpj ?? "")
            }
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Readonly
            label={"Endereço"}
            value={selectedClient?.address.full}
          />
          <Input.Readonly
            label={"CEP"}
            value={formatCep(selectedClient?.address.cep ?? "")}
          />
          <Input.Readonly label={"UF"} value={selectedClient?.address.state} />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Venda</S.GroupTitle>
        <S.FormLine>
          <Input.Select
            label="Representante"
            onChange={(v) => handleField("representative", v)}
            value={order.representative}
            roOptions={options.representatives}
            avoidAutoSelect={true}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Select
            label="Forma de pagamento"
            onChange={(v) => handleField("payment", v)}
            value={order.payment.type}
            roOptions={options.payments}
          />
          <Input.Readonly
            label="Valor total"
            value={formatMoney(order.value)}
          />
          {order.payment.type === "slip" && (
            <>
              <Input.Default
                label="Parcelas"
                value={order.payment.installments}
                onChange={(v) => handleField("installments", v)}
              />
            </>
          )}
        </S.FormLine>
        <S.FormLine>
          <Input.Select
            label="Emissora"
            onChange={(v) => handleField("emmitter", v)}
            value={order.emmitter}
            roOptions={options.emmitters}
          />
          <Input.Date
            label="Prazo"
            onChange={(v) => handleField("deadline", v)}
            value={order.deadline}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup $fullSize={true}>
        <S.GroupTitle>Produtos</S.GroupTitle>
        <S.FormLine>
          <S.Button $role={"add"} onClick={toggleProductsModal}>
            {icons.add}
            <span>Adicionar produto</span>
          </S.Button>
        </S.FormLine>
        <S.FormLine $fullSize={true}>
          <div style={{ width: "100%" }}>
            <Table
              config={tableConfig.orderFormProducts}
              data={order.products}
              actions={[deleteCallback]}
            />
          </div>
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Resumo</S.GroupTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              icon={"location"}
              label={"Endereço"}
              value={selectedClient?.address.full as string}
              size={6}
            />
            <AdditionalInfo
              icon={"location"}
              label={"CEP"}
              value={formatCep(selectedClient?.address.cep ?? "")}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              icon={"bookmark"}
              label={"CPF / CNPJ"}
              value={
                selectedClient?.type === "phisical"
                  ? formatCpf(selectedClient?.cpf ?? "")
                  : formatCnpj(selectedClient?.cnpj ?? "")
              }
              size={3}
            />
            <AdditionalInfo
              icon={"bookmark"}
              label={"Insc. Estadual"}
              value={formatStateRegister(selectedClient?.stateRegister ?? "")}
              size={3}
            />
            <AdditionalInfo
              icon={"calendar"}
              label={"Prazo"}
              value={parseDate(order.deadline, "ddmmyyyy")}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Valor total"}
              value={formatMoney(order.value)}
              size={3}
            />
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Pagamento"}
              value={payments[order.payment.type]}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>

        <S.AdditionalInfosArea>
          <S.AIRow>
            {order.representative && (
              <AdditionalInfo
                label={"Representante"}
                value={order.representative}
                size={3}
              />
            )}
            <AdditionalInfo
              label={"Emissora"}
              value={
                options.emmitters.find((e) => e.key === order.emmitter)
                  ?.value as string
              }
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.FormGroup>
    </S.Content>
  )
}

export default OrdersForm

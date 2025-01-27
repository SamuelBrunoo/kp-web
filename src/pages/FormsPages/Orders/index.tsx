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
import { parseDate } from "../../../utils/helpers/formatters/date"
import { validateNewOrder } from "../../../utils/helpers/validators/order"
import getStore from "../../../store"

const OrdersForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { controllers } = getStore()

  const [order, setOrder] = useState<TNewOrder | TOrder>(
    initialForm.order as any
  )

  // Page control

  const [options, setOptions] = useState<{ [key: string]: TRoOption[] }>({
    clients: [],
    representatives: [],
    payments: [],
    paymentStatus: [
      { key: "awaiting", value: "Aguardando" },
      { key: "paid", value: "Pago" },
    ],
    emmitters: [],
    shippingTypes: [
      { key: "mail", value: "Correios" },
      { key: "representative", value: "Representante" },
      { key: "transporter", value: "Transportadora" },
    ],
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
    const check = validateNewOrder(order)

    if (!check.hasErrors) {
      if (id) {
        // edit ...
        const update = await Api.orders.updateOrder({ order: order as TOrder })
        if (update.ok) {
          controllers.feedback.setData({
            message: "Pedido editado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        }
      } else {
        const create = await Api.orders.createOrder({
          newOrder: order as TNewOrder,
        })
        if (create.ok) {
          controllers.feedback.setData({
            message: "Pedido adicionado com sucesso",
            state: "success",
            visible: true,
          })
          navigate(-1)
        }
      }
    } else {
      controllers.feedback.setData({
        message: check.message,
        state: "error",
        visible: true,
      })
    }
  }

  const handleField = useCallback(
    (field: string, value: any) => {
      if (field === "client") {
        const c = clients.find((c) => c.id === value) as TClient

        setSelectedClient(c)
      } else if (field === "installments") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, installments: value },
        }))
        return
      } else if (field === "payment") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, type: value },
        }))
        return
      } else if (field === "paymentStatus") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, status: value },
        }))
        return
      }

      setOrder((c) => ({ ...c, [field]: value }))
    },
    [clients, order]
  )

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

    const listIndex = order.products.findIndex((op) => op.id === product.id)
    if (listIndex === -1) {
      setOrder((ord) => ({ ...ord, products: [...ord.products, obj] }))
    } else {
      setOrder((ord) => ({
        ...ord,
        products: ord.products.map((op) =>
          op.id !== product.id
            ? op
            : { ...op, quantity: op.quantity + quantity }
        ),
      }))
    }

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

  const calcTotal = () => {
    let v = 0

    order.products.forEach((p) => {
      const prodSum = p.quantity * p.price
      v += prodSum
    })

    return v
  }

  // # Initial loading

  useEffect(() => {
    const total = calcTotal()
    const prodsQnt = order.products.reduce((sum, p) => sum + p.quantity, 0)
    setOrder((ord) => ({
      ...ord,
      value: total,
      total: { products: prodsQnt, value: total },
    }))
  }, [order.products])

  const loadData = useCallback(async () => {
    try {
      const req = await Api.orders.formBare({})

      if (req.ok) {
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
          const orderInfo = await Api.orders.getOrder({ id })

          if (orderInfo.ok) {
            setTimeout(() => {
              const data = orderInfo.data.order

              setOrder(data)

              handleField("emmitter", data.emmitter)
              const c = pageInfo.clients.find(
                (c) => c.id === (data.client as any)
              ) as TClient

              setSelectedClient(c)
            }, 150)
          }
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
          orderProducts: order.products,
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
          <Input.Select
            label="Emissora"
            onChange={(v) => handleField("emmitter", v)}
            value={order.emmitter}
            roOptions={options.emmitters}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Select
            label="Forma de pagamento"
            onChange={(v) => handleField("payment", v)}
            value={order.payment.type}
            roOptions={options.payments}
          />
          <Input.Select
            label="Status do pagamento"
            onChange={(v) => handleField("paymentStatus", v)}
            value={order.payment.status}
            roOptions={options.paymentStatus}
          />
          {/* TODO: Table increment installments */}
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
          <Input.Date
            label="Data do pedido"
            onChange={(v) => handleField("orderDate", v)}
            value={order.orderDate}
          />
          <Input.Date
            label="Prazo"
            onChange={(v) => handleField("deadline", v)}
            value={order.deadline}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Select
            label="Método de entrega"
            onChange={(v) => handleField("shippingType", v)}
            value={order.shippingType}
            roOptions={options.shippingTypes}
            avoidAutoSelect={true}
          />
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup $fullSize={true}>
        <S.GroupTitle>Produtos</S.GroupTitle>
        <S.FormLine>
          {/* <S.Button $role={"add"} onClick={toggleProductsModal}>
            {icons.add} */}
          <span>Adicionar produto</span>
          {/* </S.Button> */}
        </S.FormLine>
        <S.FormLine $fullSize={true}>
          <div style={{ width: "100%" }}>
            <Table
              config={tableConfig.orderFormProducts}
              data={order.products}
              actions={{ deleteCallback }}
            />
          </div>
        </S.FormLine>
      </S.FormGroup>

      <S.FormGroup>
        <S.GroupTitle>Resumo</S.GroupTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              label={"Cliente"}
              value={selectedClient?.name ?? ""}
              size={6}
            />
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
              icon={"calendar"}
              label={"Prazo"}
              value={parseDate(order.deadline, "ddmmyyyy")}
              size={6}
            />
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Valor total"}
              value={formatMoney(order.value)}
              size={6}
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
            <AdditionalInfo
              label={"Emissora"}
              value={
                options.emmitters.find((e) => e.key === order.emmitter)
                  ?.value as string
              }
              size={6}
            />
            <AdditionalInfo
              label={"Representante"}
              value={
                options.representatives.find(
                  (r) => r.key === order.representative
                )?.value ?? "Não definido"
              }
              size={6}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.FormGroup>
    </S.Content>
  )
}

export default OrdersForm

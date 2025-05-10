/* eslint react-hooks/exhaustive-deps: "off" */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../../api"

import * as S from "./styles"

import { TRoOption } from "../../../utils/@types/sys/roOptions"

import PageHead from "../../../components/PageHead"

import { initialForm } from "../../../utils/initialData/form"
import { TBaseClient, TClient } from "../../../utils/@types/data/client"
import { parseRoOption } from "../../../utils/helpers/parsers/roOption"
import { TNewOrder, TOrder } from "../../../utils/@types/data/order"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/sys/table"
import {
  installmentsDueOptions,
  installmentsOptions,
  payments,
} from "../../../utils/sys/payments"
import { TProduct } from "../../../utils/@types/data/product"
import { TProductType } from "../../../utils/@types/data/productType"
import { TColor } from "../../../utils/@types/data/color"
import { TModel } from "../../../utils/@types/data/model"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import { validateNewOrder } from "../../../utils/helpers/validators/order"
import getStore from "../../../store"
import Form from "../../../components/Form"
import Button from "../../../components/Button"
import Icons from "../../../assets/icons"
import FormBottomButtons from "../../../components/FormBottomButtons"
import { TGroup } from "../../../utils/@types/components/Form"
import { theme } from "../../../theme"
import { TRepresentative } from "../../../utils/@types/data/representative"
import { getRepresentativeComissionString } from "../../../utils/helpers/formatters/commission"
import { TPaymentConfig } from "../../../utils/@types/data/payment"

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
    installments: [],
    installmentsDue: [],
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
    shippingModes: [
      { key: "sedex", value: "Sedex" },
      { key: "pac", value: "PAC" },
    ],
  })

  const [prodTypes, setProdTypes] = useState<TProductType[]>([])
  const [models, setModels] = useState<TModel[]>([])
  const [colors, setColors] = useState<TColor[]>([])

  const [representatives, setRepresentatives] = useState<TRepresentative[]>([])

  const [clients, setClients] = useState<TBaseClient[]>([])
  const [productsList, setProdList] = useState<TProduct[]>([])
  const [, setSelectedClient] = useState<TBaseClient | null>(null)
  const [showingModal, setShowingModal] = useState(false)

  const [deleting, setDeleting] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = async () => {
    setDeleting(true)
    // ...
    setDeleting(false)
  }

  const handleSave = async () => {
    setSubmitting(true)

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

    setSubmitting(false)
  }

  const handleField = useCallback(
    (field: string, value: any) => {
      if (field === "client") {
        const c = clients.find((c) => c.id === value) as TClient

        setSelectedClient(c)
      } else if (field === "hasInstallments") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, hasInstallments: value },
        }))
        return
      } else if (field === "installments") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, installments: value },
        }))
        return
      } else if (field === "installmentsDue") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, due: value },
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
    try {
      const m = models.find((m) => m.id === product.model) as TModel

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
    } catch (error) {
      // ... feedback error
    }
  }

  const removeProductFromQueue = (id: string) => {
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

  const getSlipDue = (slipStep: number, dueDate: string) => {
    let str = ""

    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const nextDueMonth =
      today.getDate() <= +dueDate ? currentMonth : currentMonth + 1

    const getsNextYear = nextDueMonth + slipStep > 12

    const slipMonth = getsNextYear
      ? nextDueMonth + slipStep - 12
      : nextDueMonth + slipStep
    const slipYear = getsNextYear ? currentYear + 1 : currentYear

    const strSlipDate = dueDate.padStart(2, "0")
    const strSlipMonth = String(slipMonth).padStart(2, "0")

    str = `${strSlipDate}/${strSlipMonth}/${slipYear}`

    return str
  }

  const getInstallmentsList = () => {
    let list: any = []

    if (order.value > 0 && order.products.length > 0) {
      for (let i = 1; i <= order.payment.installments; i++) {
        const pKey = i

        const item: any = {
          installment: `${String(pKey).padStart(2, "0")} de ${String(
            +order.payment.installments
          ).padStart(2, "0")}`,
          value: formatMoney(order.value / order.payment.installments),
          due: getSlipDue(i, String(order.payment.due)),
          code: "O código aparecerá aqui.",
          paidTotal: formatMoney(
            (order.value / order.payment.installments) * pKey
          ),
          totalPrice: formatMoney(order.value),
        }

        list.push(item)
      }
    }

    return list
  }

  // # Initial loading

  useEffect(() => {
    const total = calcTotal()
    const prodsQnt = order.products.reduce((sum, p) => sum + p.quantity, 0)
    setOrder((ord) => ({
      ...ord,
      value: total,
      totals: { products: prodsQnt, value: total },
    }))
  }, [order.products])

  const loadData = useCallback(async () => {
    try {
      const req = await Api.formBare.order({ orderId: id })

      if (req.ok) {
        const pageInfo = req.data

        handleField("emmitter", pageInfo.emmitters[0].id)

        setClients(pageInfo.clients)
        setProdList(pageInfo.products)
        setRepresentatives(pageInfo.representatives)

        setProdTypes(pageInfo.prodTypes)
        setModels(pageInfo.models)
        setColors(pageInfo.colors)

        setOptions((opts) => ({
          ...opts,
          clients: parseRoOption(pageInfo.clients, "clientName", "id"),
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
          installments: installmentsOptions,
          installmentsDue: installmentsDueOptions,
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
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      alert("Tente novamente mais tarde")
      navigate(-1)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  /* Engine */

  const handleAddProduct = () => {
    controllers.modal.open({
      role: "addOrderProduct",
      visible: true,
      width: "md",
      data: {
        prodTypes,
        colors,
        models,
        products: productsList,
        orderProducts: order.products,
      },
      onClose: toggleProductsModal,
      handleOp: addProduct,
    })
  }

  return (
    <S.Content>
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
      <Form
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
        columns={[
          {
            blocks: [
              {
                title: "Comprador",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        label: "Cliente",
                        placeholder: "Cliente",
                        field: "client",
                        options: options.clients,
                        value: order.client as string,
                        type: "select",
                        gridSizes: { big: 3 },
                        avoidAutoSelect: true,
                      },
                    ],
                  },
                ],
              },
              {
                title: "Detalhes da venda",
                groups: [
                  {
                    type: "fields",
                    columns: 8,
                    fields: [
                      [
                        {
                          label: "Data da venda",
                          field: "orderDate",
                          value: order.orderDate as any,
                          type: "date",
                          gridSizes: { big: 2 },
                        },
                        {
                          label: "Data do envio",
                          field: "deadline",
                          value: order.deadline as any,
                          type: "date",
                          gridSizes: { big: 2 },
                        },
                      ],
                      {
                        label: "Emissora",
                        field: "emmitter",
                        options: options.emmitters,
                        value: order.emmitter as string,
                        type: "select",
                        gridSizes: { big: 2 },
                        avoidAutoSelect: true,
                      },
                      [
                        {
                          label: "Envio",
                          field: "shippingType",
                          options: options.shippingTypes,
                          value: order.shippingType,
                          type: "select",
                          gridSizes: { big: 1 },
                          avoidAutoSelect: true,
                        },
                        {
                          label: "Emissora",
                          field: "shippingMode",
                          options: options.shippingModes,
                          value: order.shippingMode as string,
                          type: "select",
                          gridSizes: { big: 1 },
                          avoidAutoSelect: true,
                        },
                      ],
                      [
                        {
                          label: "Representante",
                          field: "representative",
                          options: options.representatives,
                          value: order.representative as string,
                          type: "select",
                          gridSizes: { big: 1 },
                          avoidAutoSelect: true,
                        },
                        {
                          label: "Comissão",
                          field: "comission",
                          value: order.representative
                            ? `${getRepresentativeComissionString(
                                representatives.find(
                                  (r) => r.id === order.representative
                                )
                                  ?.paymentConfig as TPaymentConfig["representative"]
                              )}%`
                            : "-",
                          type: "readonly",
                          gridSizes: { big: 1 },
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                title: "Produtos",
                groups: [
                  {
                    type: "custom",
                    element: (
                      <S.FormGroup $fullSize={true}>
                        <S.FormLine>
                          <Button
                            type="secondary"
                            color="green"
                            startIcon={<Icons.Add />}
                            action={handleAddProduct}
                          />
                        </S.FormLine>
                        <S.FormLine $fullSize={true}>
                          <div style={{ width: "100%" }}>
                            <Table
                              config={tableConfig.orderFormProducts}
                              data={order.products}
                              actions={{
                                deleteCallback: removeProductFromQueue,
                              }}
                              extra={{
                                productTypes: prodTypes,
                              }}
                            />
                          </div>
                        </S.FormLine>
                      </S.FormGroup>
                    ),
                  },
                ],
              },
              {
                title: "Pagamento",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        label: "Forma",
                        field: "payment",
                        options: options.payments,
                        value: order.payment.type,
                        type: "select",
                        gridSizes: { big: 3 },
                        avoidAutoSelect: true,
                      },
                      [
                        {
                          label: "Valor bruto",
                          field: "grossValue",
                          value: formatMoney(order.totals.value),
                          type: "readonly",
                          gridSizes: { big: 1 },
                          color: "orange",
                        },
                        {
                          label: "Comissão",
                          field: "comission",
                          value: formatMoney(0),
                          type: "readonly",
                          gridSizes: { big: 1 },
                          color: "orange",
                        },
                        {
                          label: "Valor líquido",
                          field: "netValue",
                          value: formatMoney(order.totals.value),
                          type: "readonly",
                          gridSizes: { big: 1 },
                          color: "orange",
                        },
                      ],
                    ],
                  },
                  ...((order.payment.type === "slip"
                    ? [
                        {
                          type: "fields",
                          fields: [
                            [
                              {
                                label: "Possui parcelamento?",
                                field: "hasInstallments",
                                options: [
                                  { key: true, value: "Sim" },
                                  { key: false, value: "Não" },
                                ],
                                value: order.payment.hasInstallments,
                                type: "select",
                                gridSizes: { big: 2 },
                                avoidAutoSelect: true,
                              },
                              ...(order.payment.hasInstallments
                                ? [
                                    {
                                      label: "Quantidade",
                                      field: "installments",
                                      options: options.installments,
                                      value: String(order.payment.installments),
                                      type: "select",
                                      gridSizes: { big: 2 },
                                      avoidAutoSelect: true,
                                    },
                                    {
                                      label: "Data do vencimento",
                                      field: "installmentsDue",
                                      options: options.installmentsDue,
                                      value: String(order.payment.due),
                                      type: "select",
                                      gridSizes: { big: 2 },
                                      avoidAutoSelect: true,
                                    },
                                  ]
                                : []),
                            ],
                          ],
                        },
                        {
                          type: "custom",
                          element: (
                            <S.FormGroup $fullSize={true}>
                              <S.FormLine $fullSize={true}>
                                <div
                                  style={{
                                    width: "100%",
                                    padding: "0 12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                  }}
                                >
                                  <Table
                                    config={tableConfig.orderFormSlips}
                                    data={getInstallmentsList()}
                                    extra={{
                                      productTypes: prodTypes,
                                    }}
                                    itemColor={theme.colors.neutral[400]}
                                    noHover={true}
                                  />

                                  {!id && (
                                    <span className="slipTableTip">
                                      Os boletos serão gerados e exibidos aqui
                                      depois da criação do pedido.
                                    </span>
                                  )}
                                </div>
                              </S.FormLine>
                            </S.FormGroup>
                          ),
                        },
                      ]
                    : []) as TGroup[]),
                ],
              },
            ],
          },
        ]}
      />

      <FormBottomButtons
        id={id}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleSave={handleSave}
        deleting={deleting}
        submitting={submitting}
      />
    </S.Content>
  )
}

export default OrdersForm

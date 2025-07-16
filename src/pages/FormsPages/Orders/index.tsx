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
import {
  Slip,
  TNewOrder,
  TOrder,
  TOrderProduct,
} from "../../../utils/@types/data/order"
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
import { FormField } from "../../../utils/@types/components/FormFields"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { checkErrors } from "../../../utils/helpers/checkErrors"
import { parseProdToOrderProduct } from "../../../utils/helpers/parsers/products"

const OrdersForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { controllers } = getStore()

  const [order, setOrder] = useState<TNewOrder | TOrder>(
    initialForm.order as TNewOrder
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

  const [errors, setErrors] = useState<TErrorsCheck>({
    has: false,
    fields: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = async () => {
    setDeleting(true)
    // ...
    setDeleting(false)
  }

  const updateErrors = () => {
    const check = checkErrors.order(order as TNewOrder)
    return check
  }

  const handleSave = async () => {
    setSubmitting(true)

    const errorCheck = updateErrors()

    if (!errorCheck.has) {
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
    } else setErrors(errorCheck)

    setSubmitting(false)
  }

  const updateErrorsField = useCallback(
    (field: string) => {
      if (errors.fields.includes(field)) {
        const newFieldsList = [...errors.fields].filter(
          (errorItem) => errorItem !== field
        )

        const newErrors = {
          fields: newFieldsList,
          has: newFieldsList.length > 0,
        }

        setErrors(newErrors)
      }
    },
    [errors]
  )

  const handleField = useCallback(
    (field: string, value: any) => {
      updateErrorsField(field)
      if (field === "client") {
        const c = clients.find((c) => c.id === value) as TClient

        setSelectedClient(c)
      } else if (field === "hasInstallments") {
        setOrder((ord) => ({
          ...ord,
          payment: {
            ...ord.payment,
            hasInstallments: String(value) === "true",
          },
        }))
        return
      } else if (field === "installments") {
        setOrder((ord) => ({
          ...ord,
          payment: { ...ord.payment, installments: +value },
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
    [clients, order, errors]
  )

  const toggleModal = () => setShowingModal(!showingModal)

  const addProduct = (product: TProduct, quantity: number) => {
    try {
      const m = models.find((m) => m.id === product.model) as TModel

      const parsedProd: TProduct = {
        ...product,
        model: m.name,
        color: colors.find((c) => c.code === product.color)?.name as string,
        price: +m.price,
      }

      console.log(`[INFO]: Parsed Product - `, parsedProd)

      const obj: TNewOrder["products"][number] = {
        ...parsedProd,
        quantity: quantity,
        status: "queued",
      }

      console.log(`[INFO]: Object - `, obj)

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
      v += p.quantity * p.price
    })

    return v
  }

  const getInstallmentsList = () => {
    let list: any = []

    if (order.value > 0 && order.products.length > 0) {
      let currentTotal = 0

      ;(order.payment.slips as Slip[]).forEach((slip: Slip) => {
        const newTotal = currentTotal + slip.value

        const item: any = {
          installment: String(slip.installment + 1).padStart(2, "0"),
          value: formatMoney(slip.value),
          due: new Date(slip.dueDate).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          }),
          code: slip.barCode,
          paidTotal: formatMoney(newTotal),
          totalPrice: formatMoney(order.value),
        }

        list.push(item)
        currentTotal = newTotal
      })
    }

    return list
  }

  // # Comission

  const calcComission = () => {
    let val = 0
    if (order.representative && order.totals.value > 0) {
      const representativeInfo = representatives.find(
        (i) => i.id === order.representative
      ) as TRepresentative

      if (representativeInfo.paymentConfig.commissionType === "fixed")
        val = representativeInfo.paymentConfig.value
      else {
        const commissionValue =
          order.totals.value * (representativeInfo.paymentConfig.value / 100)
        val = commissionValue
      }
    }
    return val
  }

  // # Initial loading

  useEffect(() => {
    const total = calcTotal()
    const prodsQnt = order.products.reduce((sum, p) => sum + p.quantity, 0)
    const commission = calcComission()
    setOrder((ord) => ({
      ...ord,
      value: total,
      totals: {
        products: prodsQnt,
        value: total,
        commission: commission,
        liquid: total - commission,
      },
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
          const orderInfo = pageInfo.order as TOrder

          const parsedOrderProducts = (
            pageInfo.order?.products as TOrderProduct[]
          )
            .map((p) => parseProdToOrderProduct(p, pageInfo.products))
            .filter((op) => op) as TNewOrder["products"]

          const orderData: TNewOrder | TOrder = {
            ...orderInfo,
            products: parsedOrderProducts,
          }

          setOrder(orderData)
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
        forForm={true}
        title={"Pedidos"}
        subtitle={`${id ? "Edição" : "Cadastro"} de pedido`}
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
                    title: "Comprador",
                    columns: 12,
                    fields: [
                      {
                        label: "Cliente",
                        field: "client",
                        options: options.clients,
                        value: order.client as string,
                        type: "searchSelect",
                        gridSizes: { big: 4, small: 12 },
                        avoidAutoSelect: true,
                        error: {
                          has: errors.fields.includes("searchSelect"),
                          message: "Escolha um cliente",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Detalhes da venda",
                    columns: 12,
                    fields: [
                      {
                        label: "Emissora",
                        field: "emmitter",
                        options: options.emmitters,
                        value: order.emmitter as string,
                        type: "select",
                        gridSizes: { big: 2, small: 12 },
                        avoidAutoSelect: true,
                      },
                      [
                        {
                          label: "Data da venda",
                          field: "orderDate",
                          value: order.orderDate as any,
                          type: "date",
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          label: "Data do envio",
                          field: "deadline",
                          value: order.deadline as any,
                          type: "date",
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                      [
                        {
                          label: "Representante",
                          field: "representative",
                          options: options.representatives,
                          value: order.representative as string,
                          type: "searchSelect",
                          gridSizes: { big: 2, small: 6 },
                          avoidAutoSelect: id !== undefined,
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
                              )}`
                            : "-",
                          type: "readonly",
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
                    type: "custom",
                    title: "Produtos",
                    element: (
                      <S.FormGroup $fullSize={true}>
                        <S.FormLine>
                          <Button
                            type="secondary"
                            color="green"
                            startIcon={<Icons.Add />}
                            action={handleAddProduct}
                            disabled={order.payment.slips !== undefined}
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
                groups: [
                  {
                    type: "fields",
                    title: "Detalhes",
                    fields: [
                      {
                        label: "Observações",
                        placeholder:
                          "Digite observações do cliente para este pedido.",
                        field: "observations",
                        value: order.observations,
                        type: "textarea",
                        gridSizes: { big: 4, small: 12 },
                      },
                    ],
                  },
                ],
              },
              {
                groups: [
                  {
                    type: "fields",
                    title: "Pagamento e envio",
                    fields: [
                      [
                        {
                          label: "Envio",
                          field: "shippingType",
                          options: options.shippingTypes,
                          value: order.shippingType,
                          type: "select",
                          gridSizes: { big: 2, small: 6 },
                          avoidAutoSelect: true,
                        },
                        ...((order.shippingType === "mail"
                          ? [
                              {
                                label: "Emissora",
                                field: "shippingMode",
                                options: options.shippingModes,
                                value: order.shippingMode as string,
                                type: "select",
                                gridSizes: { big: 2, small: 6 },
                                avoidAutoSelect: true,
                              },
                            ]
                          : []) as FormField[]),
                      ],
                      {
                        label: "Forma",
                        field: "payment",
                        options: options.payments,
                        value: order.payment.type,
                        type: "select",
                        gridSizes: { big: 3, small: 6 },
                        avoidAutoSelect: true,
                        disabled: order.payment.slips !== undefined,
                      },
                      [
                        {
                          label: "Valor bruto",
                          field: "grossValue",
                          value: formatMoney(order.totals.value),
                          type: "readonly",
                          gridSizes: { big: 1, small: 4 },
                          color: "orange",
                          error: {
                            has: errors.fields.includes("value"),
                            message: "O valor não pode ser 0",
                          },
                        },
                        {
                          label: "Comissão",
                          field: "comission",
                          value: formatMoney(calcComission()),
                          type: "readonly",
                          gridSizes: { big: 1, small: 4 },
                          color: "orange",
                        },
                        {
                          label: "Valor líquido",
                          field: "netValue",
                          value: formatMoney(
                            order.totals.value - calcComission()
                          ),
                          type: "readonly",
                          gridSizes: { big: 1, small: 4 },
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
                                label: "Parcelado",
                                field: "hasInstallments",
                                options: [
                                  { key: true, value: "Sim" },
                                  { key: false, value: "Não" },
                                ],
                                value: order.payment.hasInstallments,
                                type: "select",
                                gridSizes: { big: 2, small: 4 },
                                disabled: order.payment.slips !== undefined,
                              },
                              ...(order.payment.hasInstallments
                                ? [
                                    {
                                      label: "Vezes",
                                      field: "installments",
                                      options: options.installments,
                                      value: order.payment.installments as any,
                                      type: "select",
                                      gridSizes: { big: 2, small: 4 },
                                      avoidAutoSelect: true,
                                      disabled:
                                        order.payment.slips !== undefined,
                                    },
                                    {
                                      label: "Vencimento",
                                      field: "installmentsDue",
                                      options: options.installmentsDue,
                                      value: String(order.payment.due),
                                      type: "select",
                                      gridSizes: { big: 2, small: 4 },
                                      avoidAutoSelect: true,
                                      disabled:
                                        order.payment.slips !== undefined,
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
                                    extra={{ productTypes: prodTypes }}
                                    itemColor={theme.colors.neutral[100]}
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

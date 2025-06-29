import { useNavigate } from "react-router-dom"
import Icons from "../../../assets/icons"
import { TPageListOrder } from "../../../utils/@types/data/order"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { tableConfig, TConfig } from "../../../utils/sys/table"
import AdditionalInfo from "../../AdditionalInfo"
import Button from "../../Button"
import OrderDetailsTable from "../../OrderDetailsTable"
import * as S from "./styles"
import { Api } from "../../../api"
import getStore from "../../../store"
import { payments } from "../../../utils/sys/payments"

type Props = {
  order: TPageListOrder
  removeOrderFromList: (orderId: string) => void
}

const OrderExpand = ({ order, removeOrderFromList }: Props) => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const { details } = order
  const { productionLineId, additional } = details

  const handleSeeProductionLine = () => {
    const url = `/dashboard/production/single/${productionLineId ?? ""}`
    navigate(url)
  }

  const handleEdit = () => {
    navigate(`/dashboard/orders/single/${order.id}`)
  }

  const handleDelete = () => {
    // ...
  }

  const getProductsListConfig: () => TConfig = () => {
    let config: TConfig = tableConfig.orderDetailsProducts
    if (order.details.additional.shippedAt) {
      config.columns = config.columns.filter(
        (i) => i.field !== "statusIndicator"
      )
    }
    return config
  }

  const handleShip = async () => {
    const shippedAt = new Date().getTime()

    try {
      const req = await Api.orders.shipOrder({ orderId: order.id, shippedAt })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Enviado com sucesso.",
          state: "success",
          visible: true,
        })

        if (removeOrderFromList) removeOrderFromList(order.id)
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um problema ao marcar como enviado. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleSlipsGenerationAction = async (shippingCost: number) => {
    try {
      const req = await Api.payments.generateOrderPayment({
        orderId: order.id,
        shippingCost,
      })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Solicitação feita com sucesso.",
          state: "success",
          visible: true,
        })
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um problema ao fazer a solicitação. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleSlipsGeneration = () => {
    controllers.modal.open({
      role: "orderPayment",
      visible: true,
      width: "sm",
      onClose: controllers.modal.close,
      bluredBack: true,
      handleOp: handleSlipsGenerationAction,
    })
  }

  const handleDownloadPdf = async () => {
    controllers.modal.open({
      role: "loading",
      visible: true,
      bluredBack: true,
    })

    try {
      const req = await Api.pdfs.getOrderPdf({
        orderId: order.id,
        forAdmin: false,
      })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Arquivo gerado com sucesso.",
          state: "success",
          visible: true,
        })
      } else {
        controllers.feedback.setData({
          message:
            "Não foi possível baixar o arquivo. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um problema ao baixar o arquivo. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    controllers.modal.close()
  }

  const handleDownloadAdminPdf = async () => {
    controllers.modal.open({
      role: "loading",
      visible: true,
      bluredBack: true,
    })

    try {
      const req = await Api.pdfs.getOrderPdf({
        orderId: order.id,
        forAdmin: true,
      })
      if (req.ok) {
        controllers.feedback.setData({
          message: "Arquivos gerados com sucesso.",
          state: "success",
          visible: true,
        })
      } else {
        controllers.feedback.setData({
          message:
            "Não foi possível baixar o arquivo. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um problema ao baixar os arquivos. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    controllers.modal.close()
  }

  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Produtos pedidos</S.IGTitle>

        <OrderDetailsTable
          config={getProductsListConfig()}
          data={order.details.products}
          noHover={true}
          totals={{ products: order.quantity, value: order.value }}
        />
      </S.InfoGroup>

      <S.InfoGroup>
        {productionLineId && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="secondary"
              endIcon={
                <Icons.Dropdown style={{ transform: "rotate(-90deg)" }} />
              }
              color="orange"
              text="Ver produção"
              action={handleSeeProductionLine}
            />
          </div>
        )}
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Informações adicionais</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"user"}
              label={"Emissor"}
              value={additional.emmitter}
              gridSizes={{ big: 2, small: 6 }}
            />
            <AdditionalInfo
              icon={"user"}
              label={"Representante"}
              value={additional.representative ?? "Não atribuído"}
              gridSizes={{ big: 2, small: 6 }}
            />
          </S.AIRow>
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"calendar"}
              label={"Pedido em"}
              value={additional.orderDate}
              gridSizes={{ big: 2, small: additional.shippedAt ? 4 : 6 }}
            />
            <AdditionalInfo
              icon={"calendar"}
              label={"Prazo"}
              value={additional.deadline}
              gridSizes={{ big: 2, small: additional.shippedAt ? 4 : 6 }}
            />
            {additional.shippedAt && (
              <AdditionalInfo
                icon={"calendar"}
                label={"Enviado em"}
                value={additional.shippedAt as string}
                gridSizes={{ big: 2, small: 4 }}
              />
            )}
          </S.AIRow>
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"user"}
              label={"Cliente"}
              value={additional.clientName}
              gridSizes={{ big: 2, small: 6 }}
            />
          </S.AIRow>
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"user"}
              label={"CPF / CNPJ"}
              value={
                additional.clientRegister.length > 11
                  ? formatCnpj(additional.clientRegister)
                  : formatCpf(additional.clientRegister)
              }
              gridSizes={{ big: 2, small: 6 }}
            />
            <AdditionalInfo
              icon={"user"}
              label={"Inscrição estadual"}
              value={
                additional.clientStateInscription
                  ? formatStateRegister(additional.clientRegister)
                  : "Não possui"
              }
              gridSizes={{ big: 2, small: 6 }}
            />
          </S.AIRow>
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Valor total"}
              value={formatMoney(additional.valueTotal)}
              gridSizes={{ big: 2, small: 6 }}
            />
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Método de pagamento"}
              value={payments[additional.paymentMethod]}
              gridSizes={{ big: 2, small: 6 }}
            />
          </S.AIRow>
          {additional.paymentMethod === "slip" && (
            <S.AIRow $columns={12}>
              <AdditionalInfo
                icon={"dollarCircle"}
                label={"Parcelado"}
                value={additional.hasInstallments ? "Sim" : "Não"}
                gridSizes={{ big: 2, small: 6 }}
              />
              {additional.hasInstallments && (
                <AdditionalInfo
                  icon={"dollarCircle"}
                  label={"Vezes"}
                  value={String(additional.installments)}
                  gridSizes={{ big: 2, small: 6 }}
                />
              )}
              {additional.hasInstallments && (
                <AdditionalInfo
                  icon={"dollarCircle"}
                  label={"Parcelas pagas"}
                  value={`${additional.paidInstallments} de ${additional.installments}`}
                  gridSizes={{ big: 2, small: 6 }}
                />
              )}
            </S.AIRow>
          )}
          <S.AIRow $columns={12}>
            <AdditionalInfo
              icon={"location"}
              label={"Endereço"}
              value={additional.address}
              gridSizes={{ big: 12 }}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>

      <S.InfoGroup>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              order.status === "done" && !order.details.additional.shippedAt
                ? "space-between"
                : "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {order.status === "done" && !order.details.additional.shippedAt && (
              <Button
                type="secondary"
                color="green"
                text={"Marcar como enviado"}
                action={handleShip}
                disabled={order.details.additional.shippedAt !== null}
              />
            )}

            {order.status === "done" &&
              order.details.additional.paymentMethod === "slip" && (
                <Button
                  type="secondary"
                  color="green"
                  text={`Gerar boleto${
                    order.details.additional.installments > 0 ? "s" : ""
                  }`}
                  action={handleSlipsGeneration}
                  disabled={order.details.additional.shippedAt !== null}
                />
              )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="secondary"
              endIcon={<Icons.DownloadFile2 />}
              color="blue"
              action={handleDownloadAdminPdf}
            />

            <Button
              type="secondary"
              endIcon={<Icons.DownloadFile />}
              color="blue"
              action={handleDownloadPdf}
            />

            {!order.details.additional.shippedAt && [
              <Button
                type="secondary"
                endIcon={<Icons.Edit />}
                color="orange"
                action={handleEdit}
              />,
              <Button
                type="secondary"
                endIcon={<Icons.Trash />}
                color="red"
                action={handleDelete}
              />,
            ]}
          </div>
        </div>
      </S.InfoGroup>
    </S.Area>
  )
}

export default OrderExpand

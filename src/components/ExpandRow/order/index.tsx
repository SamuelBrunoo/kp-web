import { useNavigate } from "react-router-dom"
import Icons from "../../../assets/icons"
import { TPageListOrder } from "../../../utils/@types/data/order"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { tableConfig } from "../../../utils/sys/table"
import AdditionalInfo from "../../AdditionalInfo"
import Button from "../../Button"
import OrderDetailsTable from "../../OrderDetailsTable"
import * as S from "./styles"

const OrderExpand = (order: TPageListOrder) => {
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

  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Produtos pedidos</S.IGTitle>

        <OrderDetailsTable
          config={tableConfig.orderDetailsProducts}
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
          <S.AIRow>
            <AdditionalInfo
              icon={"user"}
              label={"Cliente"}
              value={additional.clientName}
              size={3}
            />
            <AdditionalInfo
              icon={"user"}
              label={"CPF / CNPJ"}
              value={
                additional.clientRegister.length > 11
                  ? formatCnpj(additional.clientRegister)
                  : formatCpf(additional.clientRegister)
              }
              size={3}
            />
            <AdditionalInfo
              icon={"user"}
              label={"Inscrição estadual"}
              value={
                additional.clientStateInscription
                  ? formatStateRegister(additional.clientRegister)
                  : "Não possui"
              }
              size={3}
            />
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              icon={"calendar"}
              label={"Data do pedido"}
              value={additional.orderDate}
              size={3}
            />
            <AdditionalInfo
              icon={"calendar"}
              label={"Prazo de envio"}
              value={additional.deadline}
              size={3}
            />
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Valor total"}
              value={formatMoney(additional.valueTotal)}
              size={3}
            />
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Método de pagamento"}
              value={additional.paymentMethod}
              size={3}
            />
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              icon={"dollarCircle"}
              label={"Parcelado"}
              value={additional.hasInstallments ? "Sim" : "Não"}
              size={3}
            />
            {additional.hasInstallments && (
              <AdditionalInfo
                icon={"dollarCircle"}
                label={"Número de parcelas"}
                value={String(additional.installments)}
                size={3}
              />
            )}
            {additional.hasInstallments && (
              <AdditionalInfo
                icon={"dollarCircle"}
                label={"Parcelas pagas"}
                value={`${additional.paidInstallments} de ${additional.installments}`}
                size={3}
              />
            )}
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              icon={"user"}
              label={"Emissor"}
              value={additional.emmitter}
              size={3}
            />
            <AdditionalInfo
              icon={"user"}
              label={"Representante"}
              value={additional.representative ?? "Não atribuído"}
              size={3}
            />
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              icon={"user"}
              label={"Endereço"}
              value={additional.address}
              size={6}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>

      <S.InfoGroup>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="secondary"
            endIcon={<Icons.Edit />}
            color="orange"
            action={handleEdit}
          />
          <Button
            type="secondary"
            endIcon={<Icons.Trash />}
            color="red"
            action={handleDelete}
          />
        </div>
      </S.InfoGroup>
    </S.Area>
  )
}

export default OrderExpand

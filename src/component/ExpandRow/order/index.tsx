import { TOrder } from "../../../utils/@types/data/order"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { parseDate } from "../../../utils/helpers/formatters/date"
import { formatMoney } from "../../../utils/helpers/formatters/money"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"
import { getStatus } from "../../../utils/helpers/parsers/getStatus"
import { payments } from "../../../utils/sys/payments"
import { tableConfig } from "../../../utils/sys/table"
import AdditionalInfo from "../../AdditionalInfo"
import OrderDetailsTable from "../../OrderDetailsTable"
import * as S from "./styles"

const OrderExpand = (order: TOrder) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Produtos pedidos</S.IGTitle>

        <OrderDetailsTable
          config={tableConfig.orderDetailsProducts}
          data={order.products}
          noHover={true}
          totals={order.total}
        />
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Informações adicionais</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              icon={"location"}
              label={"Endereço"}
              value={order.client.address.full}
              size={6}
            />
            <AdditionalInfo
              icon={"location"}
              label={"CEP"}
              value={formatCep(order.client.address.cep)}
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
                order.client.type === "phisical"
                  ? formatCpf(order.client.cpf as string)
                  : formatCnpj(order.client.cnpj as string)
              }
              size={3}
            />
            <AdditionalInfo
              icon={"bookmark"}
              label={"Insc. Estadual"}
              value={formatStateRegister(order.client.stateRegister)}
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
            <AdditionalInfo
              label={"Status"}
              value={getStatus("payment", order.payment.status)}
              size={2}
            />
            <AdditionalInfo
              icon={"dollarBox"}
              label={"Nº de pagamento"}
              value={order.payment.paymentNumber}
              size={8}
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
              value={order.emmitter}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>
    </S.Area>
  )
}

export default OrderExpand

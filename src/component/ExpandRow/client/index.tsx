import * as S from "./styles"

import { TClient } from "../../../utils/@types/data/client"
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
import { formatPhone } from "../../../utils/helpers/formatters/phone"

const ClientExpand = (client: TClient) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Endereço</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              label={"Estado"}
              value={client.address.state}
              size={3}
            />
            <AdditionalInfo
              label={"Cidade"}
              value={client.address.city}
              size={3}
            />
            <AdditionalInfo
              label={"CEP"}
              value={formatCep(client.address.cep)}
              size={3}
            />
            <AdditionalInfo
              label={"Rua"}
              value={`${client.address.street}`}
              size={3}
            />
            <AdditionalInfo
              label={"Número"}
              value={
                client.address.number ? ` nº ${client.address.number}` : ""
              }
              size={2}
            />
            <AdditionalInfo
              label={"Bairro"}
              value={client.address.neighborhood}
              size={2}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Documentos e contato</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              icon={"bookmark"}
              label={"CPF"}
              value={client.cpf ? formatCpf(client.cpf) : "-"}
              size={3}
            />
            <AdditionalInfo
              icon={"bookmark"}
              label={"Insc. Estadual"}
              value={formatStateRegister(client.stateRegister)}
              size={3}
            />
            <AdditionalInfo
              icon={"bookmark"}
              label={"CNPJ"}
              value={client.cnpj ? formatCnpj(client.cnpj) : "-"}
              size={3}
            />
            <AdditionalInfo
              icon={"bookmark"}
              label={"Telefone"}
              value={formatPhone(client.phone)}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>
    </S.Area>
  )
}

export default ClientExpand

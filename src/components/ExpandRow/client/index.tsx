import * as S from "./styles"

import { TPageListClient } from "../../../utils/@types/data/client"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"

import AdditionalInfo from "../../AdditionalInfo"
import { formatPhone } from "../../../utils/helpers/formatters/phone"

const ClientExpand = (clientData: TPageListClient) => {
  const { details: client } = clientData

  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Endereço</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
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
              size={3}
            />
            <AdditionalInfo
              label={"Bairro"}
              value={client.address.neighborhood}
              size={3}
            />
          </S.AIRow>
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
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Documentos e contato</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo label={"Email"} value={client.email} size={3} />
            <AdditionalInfo
              label={"Telefone"}
              value={formatPhone(client.phone1)}
              size={3}
            />
          </S.AIRow>
          <S.AIRow>
            <AdditionalInfo
              label={"CPF"}
              value={formatCpf(client.documents.register)}
              size={3}
            />
            {client.type === "juridical" && (
              <>
                <AdditionalInfo
                  label={"Insc. Estadual"}
                  value={formatStateRegister(client.documents.register)}
                  size={3}
                />
                <AdditionalInfo
                  label={"CNPJ"}
                  value={formatCnpj(client.documents.register)}
                  size={3}
                />
              </>
            )}
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Pedidos</S.IGTitle>

        <S.AdditionalInfosArea>
          <S.AIRow>
            <AdditionalInfo
              label={"Representante"}
              value={client.representative ?? ""}
              size={3}
            />
            <AdditionalInfo
              label={"Pedidos já feitos"}
              value={String(client.orders.length)}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>
    </S.Area>
  )
}

export default ClientExpand

import * as S from "./styles"

import { TClient } from "../../../utils/@types/data/client"
import { formatCep } from "../../../utils/helpers/formatters/cep"
import { formatCnpj } from "../../../utils/helpers/formatters/cnpj"
import { formatCpf } from "../../../utils/helpers/formatters/cpf"
import { formatStateRegister } from "../../../utils/helpers/formatters/stateRegister"

import AdditionalInfo from "../../AdditionalInfo"
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
              value={formatCpf(client.documents.register)}
              size={3}
            />
            {client.type === "juridical" && (
              <>
                <AdditionalInfo
                  icon={"bookmark"}
                  label={"Insc. Estadual"}
                  value={formatStateRegister(client.documents.register)}
                  size={3}
                />
                <AdditionalInfo
                  icon={"bookmark"}
                  label={"CNPJ"}
                  value={formatCnpj(client.documents.register)}
                  size={3}
                />
              </>
            )}
            <AdditionalInfo
              icon={"bookmark"}
              label={"Telefone"}
              value={formatPhone(client.phone1)}
              size={3}
            />
          </S.AIRow>
        </S.AdditionalInfosArea>
      </S.InfoGroup>
    </S.Area>
  )
}

export default ClientExpand

import * as S from "./styles"

import { TPageListProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import PLDetailsTable from "../../PLDetailsTable"
import ExpansibleRow from ".."
import Table from "../../Table"
import { TOPStatus } from "../../../utils/@types/data/order"
import { TRoOption } from "../../../utils/@types/sys/roOptions"
import Button from "../../Button"
import Icons from "../../../assets/icons"

type Props = {
  hasChanges: boolean
  responsableList: TRoOption[]
  item: TPageListProductionLine["order"]
  onChangeResponsable: (plId: string, id: any, newResponsable: string) => void
  onChangeStatus: (plId: string, id: any, newStatus: TOPStatus) => void
  handleSave: () => Promise<void>
}

const ProductionLineExpand = ({
  hasChanges,
  responsableList,
  item,
  onChangeResponsable,
  onChangeStatus,
  handleSave,
}: Props) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Lista de produção</S.IGTitle>

        <PLDetailsTable
          config={tableConfig.productProductionGroup}
          data={item.details.products ?? []}
          expandComponent={ExpansibleRow.PLProductDetails}
        />
      </S.InfoGroup>

      <S.InfoGroup>
        <S.IGTitle>Atribuições</S.IGTitle>

        <Table
          config={tableConfig.productionLineAttributions}
          data={item.details.attributions}
          noHover={true}
          extra={{
            responsableList: responsableList,
          }}
          actions={{
            onChangeResponsable: (id: number, newRepsonsable: string) =>
              onChangeResponsable(item.id, id, newRepsonsable),
            onChangeStatus: (id: number, newStatus: TOPStatus) =>
              onChangeStatus(item.id, id, newStatus),
          }}
        />
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
            disabled={!hasChanges}
            text="Salvar alterações"
            endIcon={<Icons.Check />}
            color="green"
            action={handleSave}
          />
        </div>
      </S.InfoGroup>
    </S.Area>
  )
}

export default ProductionLineExpand

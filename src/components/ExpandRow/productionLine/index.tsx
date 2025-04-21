import * as S from "./styles"

import { TPageListProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import PLDetailsTable from "../../PLDetailsTable"
import ExpansibleRow from ".."
import Table from "../../Table"

const ProductionLineExpand = (item: TPageListProductionLine["order"]) => {
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
        />
      </S.InfoGroup>
    </S.Area>
  )
}

export default ProductionLineExpand

import * as S from "./styles"

import { TProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import PLDetailsTable from "../../PLDetailsTable"
import ExpansibleRow from ".."

const ProductionLineExpand = (pl: TProductionLine) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <S.IGTitle>Lista de produção</S.IGTitle>

        <PLDetailsTable
          config={tableConfig.productProductionGroup}
          data={pl.products}
          expandComponent={ExpansibleRow.PLProductDetails}
        />
      </S.InfoGroup>
    </S.Area>
  )
}

export default ProductionLineExpand

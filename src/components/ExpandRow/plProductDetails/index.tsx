import * as S from "./styles"

import { TProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import PLProductDetailsTable from "../../PLProductDetailsTable"
import ExpansibleRow from ".."

const PLProductExpand = (pl: TProductionLine["products"][number]) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <PLProductDetailsTable
          config={tableConfig.productionLineProductList}
          data={pl.list}
          expandComponent={ExpansibleRow.PLProductExpandList}
        />
      </S.InfoGroup>
    </S.Area>
  )
}

export default PLProductExpand

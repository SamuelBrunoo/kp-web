import * as S from "./styles"

import { TProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import PLProductDetailsTable from "../../PLProductDetailsTable"

const PLProductExpand = (pl: TProductionLine["products"][number]) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <PLProductDetailsTable
          config={tableConfig.productProduction}
          data={pl.list}
        />
      </S.InfoGroup>
    </S.Area>
  )
}

export default PLProductExpand

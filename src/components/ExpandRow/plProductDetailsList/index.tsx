import * as S from "./styles"

import { TPageListProductionLine } from "../../../utils/@types/data/productionLine"
import { tableConfig } from "../../../utils/sys/table"

import Table from "../../Table"

const PLProductExpandList = (
  data: TPageListProductionLine["order"]["details"]["products"]
) => {
  return (
    <S.Area>
      <S.InfoGroup>
        <Table config={tableConfig.productionLineProductList} data={data} />
      </S.InfoGroup>
    </S.Area>
  )
}

export default PLProductExpandList

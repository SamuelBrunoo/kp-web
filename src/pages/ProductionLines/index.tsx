import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"
import ExpansibleRow from "../../component/ExpandRow"
import { TProductionLine } from "../../utils/@types/data/productionLine"

const ProductionLinesPage = () => {
  const [productionLines, setProductionLines] = useState<TProductionLine[]>([])
  const [search, setSearch] = useState("")

  const deleteCallback = (id: string) => {
    setProductionLines((pls) => pls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.get.productionLines({})
      if (req.success) {
        const list = req.data.list
        setProductionLines(list)
      } else throw new Error(req.error.message)
    } catch (error) {
      // feedbackError
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <PageHead
        title={"Linha de produção"}
        search={search}
        onChangeSearch={setSearch}
        // buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* TODO: Tabs */}

      {/* Table */}
      <Table
        config={tableConfig.productionLines}
        data={productionLines}
        actions={[deleteCallback]}
        search={search}
        searchFields={["orderCode", "clientName"]}
        expandComponent={ExpansibleRow.ProductionLineExpand}
      />
    </S.Content>
  )
}

export default ProductionLinesPage

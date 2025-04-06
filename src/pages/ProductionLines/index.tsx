import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import ExpansibleRow from "../../components/ExpandRow"
import { TProductionLine } from "../../utils/@types/data/productionLine"
import LoadingModal from "../../components/Modal/variations/Loading"

const ProductionLinesPage = () => {
  const [loading, setLoading] = useState(false)

  const [productionLines, setProductionLines] = useState<TProductionLine[]>([])
  const [search, setSearch] = useState("")

  const deleteCallback = (id: string) => {
    setProductionLines((pls) => pls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.productionLines.getProductionLines({})
      if (req.ok) {
        const list = req.data.list
        setProductionLines(list)
      } else throw new Error(req.error.message)
    } catch (error) {
      // feedbackError
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <LoadingModal visible={loading} />

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
        actions={{ deleteCallback }}
        search={search}
        searchFields={["orderCode", "clientName"]}
        expandComponent={ExpansibleRow.ProductionLineExpand}
      />
    </S.Content>
  )
}

export default ProductionLinesPage

import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import { TOrder } from "../../utils/@types/data/order"
import ExpansibleRow from "../../components/ExpandRow"
import LoadingModal from "../../components/Modal/variations/Loading"

const OrdersPage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useState<TOrder[]>([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setOrders((mdls) => mdls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.orders.getPageListOrders({})
      if (req.ok) {
        const list = req.data.list
        setOrders(list)
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
        title={"Pedidos"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.orders}
        data={orders}
        actions={{ deleteCallback }}
        search={search}
        searchFields={["clientName", "value"]}
        expandComponent={ExpansibleRow.OrderExpand}
      />
    </S.Content>
  )
}

export default OrdersPage

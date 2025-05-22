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
import getStore from "../../store"

const tabs = [
  { key: "todo", name: "À Fazer" },
  { key: "waitingShip", name: "À Enviar" },
  { key: "shipped", name: "Enviados" },
]

const OrdersPage = () => {
  const { controllers } = getStore()

  const [tab, setTab] = useState<string>("todo")

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
      const req = await Api.orders.getPageListOrders({ shippingStatus: tab })
      if (req.ok) {
        const list = req.data.list
        setOrders(list)
      } else throw new Error(req.error.message)
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um problema ao carregar as informações. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
  }, [controllers.feedback, tab])

  useEffect(() => {
    loadData()
  }, [loadData, tab])

  const removeOrderFromList = (orderId: string) => {
    const newList = orders.filter((o) => o.id !== orderId)
    setOrders(newList)
  }

  return (
    <S.Content>
      <LoadingModal visible={loading} />

      <PageHead
        title={"Pedidos"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
        tab={tab}
        tabs={tabs}
        onChangeTab={setTab}
      />

      {/* Table */}
      <Table
        config={tableConfig.orders}
        data={orders}
        actions={{ deleteCallback }}
        search={search}
        searchFields={["clientName", "value"]}
        expandComponent={(orderInfo) => (
          <ExpansibleRow.OrderExpand
            order={orderInfo}
            removeOrderFromList={removeOrderFromList}
          />
        )}
      />
    </S.Content>
  )
}

export default OrdersPage

import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import {
  Slip,
  TOrderStatus,
  TPageListOrder,
} from "../../utils/@types/data/order"
import ExpansibleRow from "../../components/ExpandRow"
import LoadingModal from "../../components/Modal/variations/Loading"
import getStore from "../../store"
import { TApi_Params_PDF } from "../../api/api/pdfs/params"
import { TStatisticsOrder } from "../../utils/@types/data/statistics/orders"

const tabs: { key: TOrderStatus; name: string }[] = [
  { key: "todo", name: "À Fazer" },
  { key: "waitingShip", name: "À Enviar" },
  { key: "shipped", name: "Enviados" },
]

const OrdersPage = () => {
  const { controllers } = getStore()

  const [tab, setTab] = useState<string>("todo")

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [ordersStatistics, setOrdersStatistics] = useState<TStatisticsOrder>()
  const [orders, setOrders] = useState<TPageListOrder[]>([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setOrders((mdls) => mdls.filter((m) => m.id !== id))
  }

  const printCallback = useCallback(
    async (slip: Slip, totalInstallments: number, clientName: string) => {
      setLoading(true)

      try {
        const params: TApi_Params_PDF["pdfs"]["getSlipPdf"] = {
          clientName: clientName,
          slipCode: slip.cleanCode,
          slipInstallment: slip.installment,
          totalInstallments: totalInstallments,
        }

        const req = await Api.pdfs.getSlipPdf(params)

        if (req.ok) {
          controllers.feedback.setData({
            state: "success",
            visible: true,
            message: "Download realizado com sucesso",
          })
        }
      } catch (error) {
        controllers.feedback.setData({
          state: "error",
          visible: true,
          message: "Houve um erro ao gerar o pdf. Tente novamente mais tarde.",
        })
      }

      setLoading(false)
    },
    [controllers.feedback]
  )

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.orders.getPageListOrders({ shippingStatus: tab })
      if (req.ok) {
        const list = req.data.list
        const stats = req.data.statistics

        setOrdersStatistics(stats)
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
        tabs={tabs.map((t) => ({
          ...t,
          name: `${t.name} (${ordersStatistics?.amountByStatus[t.key]})`,
        }))}
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
            printCallback={printCallback}
          />
        )}
      />
    </S.Content>
  )
}

export default OrdersPage

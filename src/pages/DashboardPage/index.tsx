import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import PageHead from "../../components/PageHead"

// import { Api } from "../../api"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"
import DashboardSellsCard from "../../components/DashboardSellsCard"
import RankingCard from "../../components/RankingCard"
import { PListVariation } from "../../components/RankingCard/variations/List"
import { POrdersVariation } from "../../components/RankingCard/variations/Orders"
import { Api } from "../../api"
import { parseOrdersToDashboardList } from "../../utils/helpers/parsers/orders"
import { TComponents } from "../../utils/@types/components"
import { getRelativeMonthName } from "../../utils/helpers/date"

const DashboardPage = () => {
  const { controllers } = getStore()

  /* Data */
  const [monthlySells, setMonthlySells] = useState<
    TComponents["cards"]["dashboard"]["monthlySells"]
  >({
    current: 0,
    last: 0,
    past: 0,
  })
  const [totalSells, setTotalSells] = useState<
    TComponents["cards"]["dashboard"]["totalSells"]
  >({ balance: 0, sells: 0, spends: 0 })

  const [bestSellers, setBestSellers] = useState<PListVariation["data"]>([])

  const [shippedToday, setShippedToday] = useState<POrdersVariation["data"]>([])
  const [waitingToShip, setWaitingToShip] = useState<POrdersVariation["data"]>(
    []
  )
  const [productionOrders, setProductionOrders] = useState<
    POrdersVariation["data"]
  >([])
  const [lastOrders, setLastOrders] = useState<POrdersVariation["data"]>([])

  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.dashboard.admin({})

      if (req.ok) {
        const info = req.data

        setMonthlySells(info.monthlySells)
        setTotalSells(info.totalSells)

        setBestSellers(info.bastSellers)

        setShippedToday(parseOrdersToDashboardList(info.orders.shippedToday))
        setWaitingToShip(parseOrdersToDashboardList(info.orders.waitingToShip))
        setProductionOrders(parseOrdersToDashboardList(info.orders.production))
        setLastOrders(parseOrdersToDashboardList(info.orders.lastOrders))
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um erro ao carregar os dados. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <LoadingModal visible={loading} />

      <PageHead
        title={"Painel administrativo"}
        forForm={true}
        withoutNewButton={true}
      />

      <S.InfoGroup>
        <S.InfoRow>
          <DashboardSellsCard
            data={{
              title: "Vendas mensais",
              mainInfo: {
                title: getRelativeMonthName(),
                value: monthlySells.current,
              },
              secondaryInfo: {
                title: getRelativeMonthName(-1),
                value: monthlySells.last,
              },
              tertiaryInfo: {
                title: getRelativeMonthName(-2),
                value: monthlySells.past,
              },
            }}
          />
          <DashboardSellsCard
            data={{
              title: "Total de vendas",
              mainInfo: { title: "Saldo", value: totalSells.balance },
              secondaryInfo: { title: "Vendas", value: totalSells.sells },
              tertiaryInfo: { title: "Custos", value: totalSells.spends },
            }}
          />
          <RankingCard
            title="Produtos mais vendidos"
            type="list"
            data={bestSellers}
          />
        </S.InfoRow>
      </S.InfoGroup>

      <S.InfoGroup>
        <PageHead
          title={""}
          subtitle={"Pedidos"}
          forForm={true}
          withoutNewButton={true}
        />

        <S.InfoRow>
          <RankingCard
            title="Enviados hoje"
            type="orders"
            data={shippedToday}
          />
          <RankingCard
            title="Aguardando envio"
            type="orders"
            data={waitingToShip}
          />
        </S.InfoRow>
        <S.InfoRow>
          <RankingCard
            title="Em produção"
            type="orders"
            data={productionOrders}
          />
          <RankingCard
            title="Últimos pedidos"
            type="orders"
            data={lastOrders}
          />
        </S.InfoRow>
      </S.InfoGroup>
    </S.Content>
  )
}

export default DashboardPage

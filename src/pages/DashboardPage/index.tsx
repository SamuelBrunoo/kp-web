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

const DashboardPage = () => {
  const { controllers } = getStore()

  /* Data */
  const [bestSellers, setBestSellers] = useState<PListVariation["data"]>([])
  const [lastOrders, setLastOrders] = useState<POrdersVariation["data"]>([])

  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // const req = await Api...
      setBestSellers([
        { id: 1, category: "Pingente", name: "Íma smart", value: 64 },
        { id: 2, category: "Pingente", name: "Íma smart", value: 63 },
        { id: 3, category: "Pingente", name: "Íma smart", value: 58 },
      ])

      setLastOrders([
        {
          id: 1,
          clientName: "Decor House",
          orderDate: "01/05/2025",
          value: 58,
          itemsCount: 14,
        },
        {
          id: 1,
          clientName: "Decor House",
          orderDate: "01/05/2025",
          value: 58,
          itemsCount: 14,
        },
        {
          id: 1,
          clientName: "Decor House",
          orderDate: "01/05/2025",
          value: 58,
          itemsCount: 14,
        },
      ])
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
              mainInfo: { title: "Maio", value: 400000 },
              secondaryInfo: { title: "Abril", value: 400000 },
              tertiaryInfo: { title: "Março", value: 400000 },
            }}
          />
          <DashboardSellsCard
            data={{
              title: "Total de vendas",
              mainInfo: { title: "Saldo", value: 600000 },
              secondaryInfo: { title: "Vendas", value: 800000 },
              tertiaryInfo: { title: "Custos", value: 200000 },
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
          <RankingCard title="Enviados hoje" type="orders" data={lastOrders} />
          <RankingCard title="Em produção" type="orders" data={lastOrders} />
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

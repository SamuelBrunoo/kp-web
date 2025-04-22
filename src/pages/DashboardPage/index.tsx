import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import PageHead from "../../components/PageHead"

// import { Api } from "../../api"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"
import DashboardSellsCard from "../../components/DashboardSellsCard"

const DashboardPage = () => {
  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // const req = await Api...
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
      </S.InfoRow>

      <PageHead
        title={""}
        subtitle={"Pedidos"}
        forForm={true}
        withoutNewButton={true}
      />
    </S.Content>
  )
}

export default DashboardPage

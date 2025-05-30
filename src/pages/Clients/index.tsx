import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import { TPageListClient } from "../../utils/@types/data/client"
import ExpansibleRow from "../../components/ExpandRow"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"

const ClientsPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [clients, setClients] = useState<TPageListClient[]>([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setClients((mdls) => mdls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.clients.getClientsListPage({})
      if (req.ok) {
        const list = req.data.list
        setClients(list)
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um erro ao carregar as informações. Tente novamente mais tarde.",
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
        title={"Clientes"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.clients}
        data={clients}
        actions={{ deleteCallback }}
        search={search}
        searchFields={["name", "socialRole", "address.full"]}
        expandComponent={ExpansibleRow.ClientExpand}
      />
    </S.Content>
  )
}

export default ClientsPage

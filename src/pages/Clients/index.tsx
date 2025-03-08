import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"
import { TClient } from "../../utils/@types/data/client"
import ExpansibleRow from "../../component/ExpandRow"

const ClientsPage = () => {
  const navigate = useNavigate()

  const [clients, setClients] = useState<TClient[]>([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setClients((mdls) => mdls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.clients.getClients({})
      if (req.ok) {
        const list = req.data.list
        setClients(list)
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

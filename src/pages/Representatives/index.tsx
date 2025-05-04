import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import { TPageListRepresentative } from "../../utils/@types/data/representative"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"

const RepresentativesPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [representatives, setRepresentatives] = useState<
    TPageListRepresentative[]
  >([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setRepresentatives((mdls) => mdls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.representatives.getRepresentativesListPage({})
      if (req.ok) {
        const list = req.data.list
        setRepresentatives(list)
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
        title={"Representantes"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.representatives}
        data={representatives}
        actions={{ deleteCallback }}
        search={search}
        searchFields={["name", "socialRole", "address.full"]}
      />
    </S.Content>
  )
}

export default RepresentativesPage

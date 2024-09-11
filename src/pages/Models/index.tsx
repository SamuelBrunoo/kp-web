import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TModel } from "../../utils/@types/data/model"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"

const ModelsPage = () => {
  const navigate = useNavigate()

  const [models, setModels] = useState<TModel[]>([])
  const [search, setSearch] = useState("")

  const handleNew = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setModels((mdls) => mdls.filter((m) => m.id !== id))
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.get.models({})
      if (req.success) {
        const list = req.data.list
        setModels(list)
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
        title={"Modelos"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.models}
        data={models}
        actions={[deleteCallback]}
      />
    </S.Content>
  )
}

export default ModelsPage

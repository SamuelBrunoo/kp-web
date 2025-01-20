import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TModel } from "../../utils/@types/data/model"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"
import getStore from "../../store"

const ModelsPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [models, setModels] = useState<TModel[]>([])
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    type: "all",
  })

  const handleNew = () => {
    navigate("single")
  }

  const handleFilter = (filter: string, value: string) =>
    setFilters((ftrs) => ({ ...ftrs, [filter]: value }))

  const deleteCallback = async (id: string) => {
    try {
      const req = await Api.delete.model({ id: id })

      if (req.success) {
        setModels((mdls) => mdls.filter((m) => m.id !== id))

        controllers.feedback.setData({
          message: "Modelo excluído com sucesso",
          state: "error",
          visible: true,
        })
      } else throw new Error(req.error.message)
    } catch (error) {
      controllers.feedback.setData({
        message:
          error.message ??
          "Não foi possível excluir o modelo. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.get.models({})
      if (req.success) {
        const list = req.data.list
        setModels(list)
      } else throw new Error(req.error.message)
    } catch (error) {
      controllers.feedback.setData({
        message: error as string,
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <PageHead
        title={"Modelos"}
        search={search}
        onChangeSearch={setSearch}
        filters={[
          {
            name: "type",
            label: "Tipo",
            options: [
              { key: "all", value: "Todos" },
              { key: "pendants", value: "Pingentes" },
              { key: "clamps", value: "Abraçadeiras" },
            ],
            value: filters.type,
          },
        ]}
        onFilterChange={handleFilter}
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

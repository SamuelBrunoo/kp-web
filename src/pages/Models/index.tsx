import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TPageListModel } from "../../utils/@types/data/model"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"
import Button from "../../components/Button"
import Icons from "../../assets/icons"

const ModelsPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [models, setModels] = useState<TPageListModel[]>([])
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    type: "all",
  })

  const handleNew = () => {
    navigate("single")
  }

  const handleFilter = (filter: string, value: string) =>
    setFilters((ftrs) => ({ ...ftrs, [filter]: value }))

  const deleteCallback = async () => {
    await loadData()

    controllers.feedback.setData({
      message: "Modelo excluído com sucesso",
      state: "success",
      visible: true,
    })
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.models.getModelsPageList({})
      if (req.ok) {
        const list = req.data.list
        setModels(list)
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
        title={"Modelos"}
        search={search}
        searchPlaceholder={"Pesquise por nome ou código..."}
        onChangeSearch={setSearch}
        filters={[
          {
            name: "type",
            label: "Tipo",
            options: [
              { key: "all", value: "Todos" },
              { key: "pendant", value: "Pingente" },
              { key: "tableNecklace", value: "Colar de mesa" },
            ],
            value: filters.type,
          },
        ]}
        onSearch={loadData}
        onFilterChange={handleFilter}
        buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
      />

      {/* Table */}
      <Table
        emptyList={{
          message: [
            "Nenhum modelo cadastrado.",
            "Clique no botão e adicione um novo.",
          ],
          component: (
            <Button
              type="primary"
              action={handleNew}
              color="green"
              text="Novo"
              startIcon={<Icons.Add />}
            />
          ),
        }}
        config={tableConfig.models}
        data={models.filter((i) =>
          filters.type !== "all" ? i.typeKey === filters.type : true
        )}
        search={search}
        searchFields={["name", "code", "price"]}
        actions={{ deleteCallback }}
      />
    </S.Content>
  )
}

export default ModelsPage

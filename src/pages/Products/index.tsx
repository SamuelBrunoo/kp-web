import React, { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TPageListProduct } from "../../utils/@types/data/product"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"
import getStore from "../../store"
import Modal from "../../component/Modal"

const ProductsPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<{ [key: string]: string }>({
    type: "all",
  })
  const [products, setProducts] = useState<TPageListProduct[]>([])
  const [search, setSearch] = useState("")

  const handleFilter = (filter: string, value: string) =>
    setFilters((ftrs) => ({ ...ftrs, [filter]: value }))

  const handleNewProduct = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setProducts((prods) => prods.filter((p) => p.id !== id))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.products.getProductsPageList({})

      if (req.ok) {
        const { list } = req.data

        setProducts(list)
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações",
        state: "error",
        visible: true,
      })
      navigate(-1)
    }

    setLoading(false)
  }, [controllers.feedback, navigate])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <Modal.Loading showing={loading} closeFn={() => {}} />

      <PageHead
        title={"Produtos"}
        search={search}
        onChangeSearch={setSearch}
        filters={[
          {
            name: "type",
            label: "Tipo",
            options: [
              { key: "all", value: "Todos" },
              { key: "pendants", value: "Pingente" },
              { key: "tableNecklace", value: "Colar de mesa" },
            ],
            value: filters.type,
          },
        ]}
        onFilterChange={handleFilter}
        buttons={[{ role: "new", text: "Novo", onClick: handleNewProduct }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.products}
        data={products.filter((i) =>
          filters.type !== "all" ? i.typeKey === filters.type : true
        )}
        search={search}
        searchFields={["model", "code", "color", "price"]}
        actions={{ deleteCallback }}
      />
    </S.Content>
  )
}

export default ProductsPage

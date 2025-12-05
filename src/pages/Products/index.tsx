import React, { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TPageListProduct } from "../../utils/@types/data/product"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import getStore from "../../store"
import LoadingModal from "../../components/Modal/variations/Loading"
import Button from "../../components/Button"
import Icons from "../../assets/icons"

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

  // Code Print

  const handlePrint = (
    config: { columns: number; rows: number },
    productId: string
  ) => {
    // ... generate pdf for productId, using received config
  }

  const printCallback = useCallback(
    (productId: string) => {
      controllers.modal.open({
        role: "codePrintConfig",
        visible: true,
        width: "sm",
        bluredBack: true,
        handleOp: (config: { columns: number; rows: number }) => {
          handlePrint(config, productId)
        },
      })
    },
    [controllers.modal]
  )

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <LoadingModal visible={loading} />

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
        onSearch={loadData}
        onFilterChange={handleFilter}
        buttons={[{ role: "new", text: "Novo", onClick: handleNewProduct }]}
      />

      {/* Table */}
      <Table
        emptyList={{
          message: [
            "Nenhum produto cadastrado.",
            "Clique no botão e adicione um novo.",
          ],
          component: (
            <Button
              type="primary"
              action={handleNewProduct}
              color="green"
              text="Novo"
              startIcon={<Icons.Add />}
            />
          ),
        }}
        config={tableConfig.products}
        data={products.filter((i) =>
          filters.type !== "all" ? i.typeKey === filters.type : true
        )}
        search={search}
        searchFields={["model", "code", "color", "price"]}
        actions={{ deleteCallback, printCallback }}
        noHover={true}
      />
    </S.Content>
  )
}

export default ProductsPage

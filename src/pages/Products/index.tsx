import React, { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TPageListProduct } from "../../utils/@types/data/product"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"

const ProductsPage = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState<TPageListProduct[]>([])
  const [search, setSearch] = useState("")

  const handleNewProduct = () => {
    navigate("single")
  }

  const deleteCallback = (id: string) => {
    setProducts((prods) => prods.filter((p) => p.id !== id))
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.products.getProductsPageList({})

      if (req.ok) {
        const { list } = req.data

        setProducts(list)
      } else throw new Error(req.error)
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
        title={"Produtos"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNewProduct }]}
      />

      {/* Table */}
      <Table
        config={tableConfig.products}
        data={products}
        actions={[deleteCallback]}
      />
    </S.Content>
  )
}

export default ProductsPage

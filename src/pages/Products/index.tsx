import React, { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { useNavigate } from "react-router-dom"
import { TProduct } from "../../utils/@types/data/product"
import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../component/PageHead"
import Table from "../../component/Table"

import { Api } from "../../api"

const ProductsPage = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState<TProduct[]>([])
  const [search, setSearch] = useState("")

  const handleNewProduct = () => {
    navigate("single")
  }

  const loadData = useCallback(async () => {
    try {
      const req = await Api.get.products({})
      if (req.success) {
        setProducts(req.data.list)
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
        title={"Produtos"}
        search={search}
        onChangeSearch={setSearch}
        buttons={[{ role: "new", text: "Novo", onClick: handleNewProduct }]}
      />

      {/* Table */}
      <Table config={tableConfig.products} data={products} />
    </S.Content>
  )
}

export default ProductsPage

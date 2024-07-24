import React, { useState } from "react"
import * as S from "./styles"

import PageHead from "../../component/PageHead"
import { tableConfig } from "../../utils/sys/table"
import useFetch from "../../utils/hooks/useFetch"
import Table from "../../component/Table"
import { useNavigate } from "react-router-dom"

const ProductsPage = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const products = useFetch("http://localhost:8080/api/products")

  const handleNewProduct = () => {
    navigate("single")
  }

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
        data={products.data ? products.data.list : []}
      />
    </S.Content>
  )
}

export default ProductsPage

import React, { useState } from "react"
import * as S from "./styles"

import PageHead from "../../component/PageHead"
import { tableConfig } from "../../utils/sys/table"
import useFetch from "../../utils/hooks/useFetch"
import Table from "../../component/Table"

const ProductForm = () => {
  const [search, setSearch] = useState("")

  const products = useFetch("http://localhost:8080/api/products")

  const handleCancel = () => {
    // ...
  }

  const handleSave = () => {
    // ...
  }

  return (
    <S.Content>
      <PageHead
        title={"Produtos"}
        subtitle="Cadastro de produto"
        buttons={[
          { role: "cancel", text: "Cancelar", onClick: handleCancel },
          { role: "new", text: "Novo", onClick: handleSave },
        ]}
      />
      
      {/* form */}
      formulário
    </S.Content>
  )
}

export default ProductForm

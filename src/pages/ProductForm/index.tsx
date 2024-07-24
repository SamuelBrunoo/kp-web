import React, { useState } from "react"
import * as S from "./styles"

import PageHead from "../../component/PageHead"
import Input from "../../component/Inpts"
import { initialForm } from "../../utils/initialData/form"

const ProductForm = () => {
  const [product, setProduct] = useState(initialForm.product)

  const handleCancel = () => {
    // ...
  }

  const handleSave = () => {
    // ...
  }

  const handleField = (field: string, value: any) => {
    // ...
    const obj = { ...product, [field]: value }
    console.log(field, value)

    setProduct(obj)
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
      <S.FormGroup>
        <S.GroupTitle>Informações gerais</S.GroupTitle>
        <S.FormLine>
          <Input.Default
            label="Tipo"
            onChange={(v) => handleField("type", v)}
            value={product.type}
          />
          <Input.Default
            label="Modelo"
            onChange={(v) => handleField("model", v)}
            value={product.model}
          />
          <Input.Default
            label="Cor"
            onChange={(v) => handleField("color", v)}
            value={product.color}
          />
        </S.FormLine>
        <S.FormLine>
          <Input.Default
            label="Código"
            onChange={(v) => handleField("code", v)}
            value={product.code}
          />
        </S.FormLine>
      </S.FormGroup>
    </S.Content>
  )
}

export default ProductForm

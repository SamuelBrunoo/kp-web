import React, { useRef } from "react"
import * as S from "./styles"

type Props = {
  placeholder?: string
  value: any
  onChange: (v: any) => void
}

const InputModal = ({ placeholder, value, onChange }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  return (
    <S.InputArea $disabled={false} $hasError={false}>
      <S.MainArea $hasError={false}>
        <S.Left>
          <S.InpLine>
            <S.Input
              ref={inputRef}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              $hasError={false}
            />
          </S.InpLine>
        </S.Left>
      </S.MainArea>
    </S.InputArea>
  )
}

export default InputModal

import { useRef } from "react"
import * as S from "../styles"

import { formatMoney } from "../../../utils/helpers/formatters/money"

type Props = {
  placeholder?: string
  label: string
  value: any
  onChange: (v: any) => void
  error?: {
    state: boolean
    message: string
  }
}

const InputModal = ({ label, value, onChange, error }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
  }

  const handleValue = (v: string) => {
    const money = v.replace(/\D/g, "")
    onChange(money)
  }

  return (
    <S.InputArea $disabled={false} $hasError={error?.state ?? false}>
      <S.SelectedArea onClick={handleClick} $hasError={error?.state ?? false}>
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={error?.state ?? false}>{label}</S.Label>
            <S.Input
              ref={inputRef}
              value={formatMoney(value)}
              onChange={(e) => handleValue(e.target.value)}
              $hasError={error?.state ?? false}
            />
          </S.InpLine>
        </S.Left>
      </S.SelectedArea>
      <span>{error?.state ? error?.message : ""}</span>
    </S.InputArea>
  )
}

export default InputModal

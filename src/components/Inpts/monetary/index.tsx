import { useRef } from "react"
import * as S from "../styles"

import { formatMoney } from "../../../utils/helpers/formatters/money"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputMonetary = {
  field: string | number
  value: string | number
  label?: string
  placeholder?: string
  limit?: number
  fixedWidth?: number
  isNumber?: boolean
  disabled?: boolean

  error?: TFieldError
  inputType?: "email" | "password"
  onEnter?: () => void
}

type Props = TInputMonetary & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputModal = ({ field, label, value, onChange, error }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
  }

  const handleValue = (v: string) => {
    const money = v.replace(/\D/g, "")
    onChange(field, money)
  }

  return (
    <S.InputArea $disabled={false} $hasError={error?.has ?? false}>
      <S.SelectedArea onClick={handleClick} $hasError={error?.has ?? false}>
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={error?.has ?? false}>{label}</S.Label>
            <S.Input
              ref={inputRef}
              value={formatMoney(+(!Number.isNaN(value) ? value : "0"))}
              onChange={(e) => handleValue(e.target.value)}
              $hasError={error?.has ?? false}
            />
          </S.InpLine>
        </S.Left>
      </S.SelectedArea>
      <span>{error?.has ? error?.message : ""}</span>
    </S.InputArea>
  )
}

export default InputModal

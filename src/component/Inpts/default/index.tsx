import { useRef } from "react"
import * as S from "../styles"

type Props = {
  label: string
  value: any
  onChange: (v: any) => void
  disabled?: boolean
  isNumber?: boolean
  error?: {
    state: boolean
    message: string
  }
}

const InputModal = ({
  label,
  value,
  onChange,
  disabled,
  error,
  isNumber,
}: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
  }

  const handleValue = (v: string) => {
    const n = isNumber
      ? v.replace(/\D/g, "").length > 0
        ? +v.replace(/\D/g, "")
        : 0
      : v
    onChange(n)
  }

  return (
    <S.InputArea $disabled={disabled} $hasError={error?.state ?? false}>
      <S.SelectedArea
        onClick={disabled ? undefined : handleClick}
        $hasError={error?.state ?? false}
      >
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={error?.state ?? false}>{label}</S.Label>
            <S.Input
              ref={inputRef}
              value={value}
              onFocus={(e) => (disabled ? e.currentTarget.blur() : undefined)}
              onChange={
                !disabled ? (e) => handleValue(e.target.value) : () => {}
              }
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

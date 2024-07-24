import { useRef } from "react"
import * as S from "../styles"

type Props = {
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
    onChange(v)
  }

  return (
    <S.InputArea $hasError={error?.state ?? false}>
      <S.SelectedArea onClick={handleClick} $hasError={error?.state ?? false}>
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={error?.state ?? false}>{label}</S.Label>
            <S.Input
              ref={inputRef}
              value={value}
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

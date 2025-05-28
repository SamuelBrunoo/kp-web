import { useRef } from "react"
import * as S from "../styles"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TTextArea = {
  label?: string
  placeholder?: string
  field: string | number
  value: string
  limit?: number
  fixedWidth?: number
  isNumber?: boolean
  disabled?: boolean

  error?: TFieldError
  onEnter?: () => void
}

type Props = TTextArea & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const Input = ({
  field,
  label,
  value,
  onChange,
  disabled,
  isNumber,
  error,
  placeholder,
  fixedWidth,
  gridSizes,
  limit,
  onEnter,
}: Props) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const handleClick = () => {
    textareaRef.current?.focus()
  }

  const handleValue = (v: string) => {
    const n = isNumber
      ? v.replace(/\D/g, "").length > 0
        ? +v.replace(/\D/g, "")
        : 0
      : v
    onChange(field, n)
  }

  return (
    <S.Wrapper $gridSizes={gridSizes}>
      <S.InputArea $disabled={disabled} $hasError={error?.has ?? false}>
        <S.Left onClick={disabled ? undefined : handleClick}>
          <S.InpLine>
            <S.Label $hasError={error?.has ?? false}>{label}</S.Label>
            <S.TextArea
              ref={textareaRef}
              value={value}
              onFocus={(e) => (disabled ? e.currentTarget.blur() : undefined)}
              onChange={
                !disabled ? (e) => handleValue(e.target.value) : () => {}
              }
              $hasError={error?.has ?? false}
              placeholder={placeholder}
              rows={6}
            />
          </S.InpLine>
        </S.Left>
        <span>{error?.has ? error?.message : ""}</span>
      </S.InputArea>
    </S.Wrapper>
  )
}

export default Input

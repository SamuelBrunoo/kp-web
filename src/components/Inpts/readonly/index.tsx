import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import * as S from "../styles"

export type TReadonlyField = {
  label?: string
  field: string
  value: string
  fixedWidth?: number
  disabled?: boolean
  color?: "orange" | "green"

  error?: TFieldError
}

type Props = TReadonlyField & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputModal = ({ label, value, gridSizes, color = "green" }: Props) => {
  return (
    <S.Wrapper $gridSizes={gridSizes}>
      <S.InputArea $disabled={false} $hasError={false}>
        <S.SelectedArea $hasError={false} $cursorNormal={true}>
          <S.Left>
            <S.InpLine>
              <S.Label $hasError={false} $color={color}>
                {label}
              </S.Label>
              <S.Value>{value}</S.Value>
            </S.InpLine>
          </S.Left>
        </S.SelectedArea>
      </S.InputArea>
    </S.Wrapper>
  )
}

export default InputModal

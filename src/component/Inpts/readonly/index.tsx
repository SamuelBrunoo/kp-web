import * as S from "../styles"

type Props = {
  label: string
  value: any
}

const InputModal = ({ label, value }: Props) => {
  return (
    <S.InputArea $disabled={false} $hasError={false}>
      <S.SelectedArea $hasError={false} $cursorNormal={true}>
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={false}>{label}</S.Label>
            <S.Value>{value}</S.Value>
          </S.InpLine>
        </S.Left>
      </S.SelectedArea>
    </S.InputArea>
  )
}

export default InputModal

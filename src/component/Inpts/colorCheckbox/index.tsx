import * as S from "./styles"
import icons from "../../../assets/icons"

type Props = {
  checked: boolean
  onChange: (v: any) => void
}

const ColorCheckbox = ({ checked, onChange }: Props) => {
  const handleClick = () => {
    onChange(!checked)
  }

  return (
    <S.Element onClick={handleClick} $showing={checked}>
      <icons.check />
    </S.Element>
  )
}

export default ColorCheckbox

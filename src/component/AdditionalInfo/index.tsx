import * as S from "./styles"
import icons from "../../assets/icons"

const iconsRelations = {
  bookmark: icons.bookmark,
  calendar: icons.calendar,
  dollarBox: icons.dollarBox,
  dollarCircle: icons.dollarCircle,
  location: icons.location,
}

type Props = {
  icon?: keyof typeof iconsRelations
  label: string
  value: string
  size?: number
}

const AdditionalInfo = ({ icon, label, value, size }: Props) => {
  return (
    <S.Box $size={size}>
      <S.Main>
        {icon && iconsRelations[icon]}
        <S.InfoName>{label}</S.InfoName>
      </S.Main>
      <S.Value>{value}</S.Value>
    </S.Box>
  )
}

export default AdditionalInfo

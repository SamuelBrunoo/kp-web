import * as S from "./styles"
import icons from "../../assets/icons"
import { FormField } from "../../utils/@types/components/FormFields"

const iconsRelations = {
  bookmark: <icons.Bookmark />,
  calendar: <icons.Calendar />,
  dollarBox: <icons.DollarBox />,
  dollarCircle: <icons.DollarCircle />,
  location: <icons.Location />,
  user: <icons.Clients />,
}

type Props = {
  icon?: keyof typeof iconsRelations
  label: string
  value: string
  size?: number
  gridSizes?: FormField["gridSizes"]
}

const AdditionalInfo = ({ icon, label, value, size, gridSizes }: Props) => {
  return (
    <S.Box $size={size} $gridSizes={gridSizes}>
      <S.Main>
        {icon && iconsRelations[icon]}
        <S.InfoName>{label}</S.InfoName>
      </S.Main>
      <S.Value>{value}</S.Value>
    </S.Box>
  )
}

export default AdditionalInfo

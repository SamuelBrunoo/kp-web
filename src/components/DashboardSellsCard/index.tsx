import { formatMoney } from "../../utils/helpers/formatters/money"
import * as S from "./styles"

type TDataInfo = {
  title: string
  value: number
}

type Props = {
  data: {
    title: string
    mainInfo: TDataInfo
    secondaryInfo: TDataInfo
    tertiaryInfo: TDataInfo
  }
}

const DashboardSellsCard = ({ data }: Props) => {
  return (
    <S.Box>
      <S.CardTitle>{data.title}</S.CardTitle>
      <S.MainInfo>
        <S.MainInfoTitle>{data.mainInfo.title}</S.MainInfoTitle>
        <S.MainInfoValue>{formatMoney(data.mainInfo.value)}</S.MainInfoValue>
      </S.MainInfo>
      <S.OthersInfosArea>
        <S.OtherInfo>
          <S.OtherInfoContent>
            <S.OtherInfoTitle>{data.secondaryInfo.title}</S.OtherInfoTitle>
            <S.OtherInfoValue>
              {formatMoney(data.secondaryInfo.value)}
            </S.OtherInfoValue>
          </S.OtherInfoContent>
        </S.OtherInfo>

        <S.Divider />

        <S.OtherInfo>
          <S.OtherInfoContent>
            <S.OtherInfoTitle>{data.tertiaryInfo.title}</S.OtherInfoTitle>
            <S.OtherInfoValue>
              {formatMoney(data.tertiaryInfo.value)}
            </S.OtherInfoValue>
          </S.OtherInfoContent>
        </S.OtherInfo>
      </S.OthersInfosArea>
    </S.Box>
  )
}

export default DashboardSellsCard

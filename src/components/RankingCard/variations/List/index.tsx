import * as S from "../../styles"

export type PListVariation = {
  title: string
  data: {
    id: number
    main: string
    secondary: string
    tertiary?: string
    value: string
  }[]
}

const ListVariation = ({ title, data }: PListVariation) => {
  return (
    <S.Box>
      <S.CardTitle>{title}</S.CardTitle>
      <S.MainInfo>
        <S.List>
          {data.map((i, k) => (
            <ListItem key={k} data={i} />
          ))}
        </S.List>
      </S.MainInfo>
    </S.Box>
  )
}

const ListItem = ({ data }: { data: PListVariation["data"][number] }) => {
  return (
    <S.ListItem>
      <S.Info $role="id">#{String(data.id).padStart(2, "0")}</S.Info>
      <S.Info $role="text" $fill={true}>
        {data.main}
      </S.Info>
      <S.Info $role="text" $fill={true}>
        {data.secondary}
      </S.Info>
      {data.tertiary && (
        <S.Info $role="text" $fill={true}>
          {data.tertiary}
        </S.Info>
      )}
      <S.Info $role="value">{data.value}</S.Info>
    </S.ListItem>
  )
}

export default ListVariation

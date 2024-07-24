import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"

type Props = {
  config: TConfig
  data: any[]
}

const Table = ({ config, data }: Props) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.RowItem>
            {config.columns.map((col, k) => (
              <S.TCol key={k} $size={col.size} $align={col.align}>
                {col.title}
              </S.TCol>
            ))}
          </S.RowItem>
        </S.TableHead>
        <S.TableBody>
          {data.map((item, k) => (
            <S.RowItem key={k}>
              {config.columns.map((col, k) => {
                let content: any = null

                content = config.specialFields[col.field]
                  ? config.specialFields[col.field](item)
                  : item[col.field]

                return (
                  <S.ItemData key={k} $align={col.align}>
                    {content}
                  </S.ItemData>
                )
              })}
            </S.RowItem>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}

export default Table

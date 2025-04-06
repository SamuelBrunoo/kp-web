import * as S from "./styles"

import { TOPStatus } from "../../utils/@types/data/order"

const textRelation: { [key in TOPStatus]: string } = {
  queued: "Em fila",
  done: "Concluído",
  doing: "Em andamento",
  lor: "Falta material",
}

type Props = {
  status: TOPStatus
  onChange?: (newValue: string) => void
}

const StatusIndicator = ({ status }: Props) => {
  return (
    <S.Box $status={status}>
      <S.Text>{textRelation[status]}</S.Text>
    </S.Box>
  )
}

export default StatusIndicator

// getStatus("resume", item.status as any)

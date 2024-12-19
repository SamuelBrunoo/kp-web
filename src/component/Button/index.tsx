import icons from "../../assets/icons"
import * as S from "./styles"

type Props = {
  type: "primary" | "secondary" | "tertiary"
  color: "green" | "red" | "orange" | "blue"
  role?: "new" | "update" | "cancel"
  text: string
  action: (p?: any) => void
}

const Button = (p: Props) => {
  return (
    <S.Button $type={p.type} $color={p.color} onClick={p.action}>
      {p.role === "new"
        ? icons.add
        : p.role === "update"
        ? icons.check
        : p.role === "cancel"
        ? icons.cancel
        : null}
      <span>{p.text}</span>
    </S.Button>
  )
}

export default Button

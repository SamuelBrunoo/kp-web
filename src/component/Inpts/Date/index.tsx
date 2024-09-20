import { useRef, useState } from "react"
import * as S from "../stylesSelect"
import icons from "../../../assets/icons"
import { parseDate } from "../../../utils/helpers/formatters/date"

type Props = {
  label?: string
  value: any
  onChange: (v: any) => void
}

const DateInput = ({ label, value, onChange }: Props) => {
  const [showing, setShowing] = useState(false)

  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)

  const togglePicker = () => {
    setShowing(!showing)
  }

  return (
    <S.SelectArea ref={wrapperRef}>
      {label && <S.Label>{label}</S.Label>}
      <S.DataArea ref={dataRef} onClick={togglePicker}>
        <S.Left>
          <S.SelectedInfo>{parseDate(value, "ddmmyyyy")}</S.SelectedInfo>
        </S.Left>
        {icons.calendar}
      </S.DataArea>
    </S.SelectArea>
  )
}

export default DateInput

import { useRef, useState } from "react"
import * as C from "../stylesSelect"
import * as S from "./styles"
import icons from "../../../assets/icons"
import { parseDate } from "../../../utils/helpers/formatters/date"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

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

  const handleDate = (val: any) => {
    const time = new Date(val).getTime()
    onChange(time)
    togglePicker()
  }

  return (
    <C.SelectArea ref={wrapperRef}>
      {label && <C.Label>{label}</C.Label>}
      <S.DataArea ref={dataRef} onClick={togglePicker}>
        <C.Left>
          <C.SelectedInfo>{parseDate(value, "ddmmyyyy")}</C.SelectedInfo>
        </C.Left>
        <icons.Calendar />
      </S.DataArea>
      <S.PickerArea>
        <DatePicker
          open={showing}
          onChange={handleDate}
          minDate={dayjs(new Date())}
        />
      </S.PickerArea>
    </C.SelectArea>
  )
}

export default DateInput

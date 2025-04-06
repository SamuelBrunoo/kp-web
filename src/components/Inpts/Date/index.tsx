import { useRef, useState } from "react"
import * as C from "../stylesSelect"
import * as S from "./styles"
import icons from "../../../assets/icons"
import { parseDate } from "../../../utils/helpers/formatters/date"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputDate = {
  label?: string
  field: string
  value: string | Date | null
  disabled?: boolean
  minDate?: Date | string | number
  maxDate?: Date | string | number
  fixedWidth?: number

  error?: TFieldError
}

type Props = TInputDate & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const DateInput = ({ field, label, value, onChange }: Props) => {
  const [showing, setShowing] = useState(false)

  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const pickerRef = useRef<null | HTMLDivElement>(null)

  const togglePicker = () => {
    setShowing(!showing)
  }

  const handleDate = (val: any) => {
    const time = new Date(val).getTime()
    onChange(field, time)
    togglePicker()
  }

  const renderDate = () => {
    let str: any = null

    if (value) {
      str = parseDate(value, "ddmmyyyy")
    }

    return str
  }

  // useEffect(() => {
  //   const collapseOwnDropdown = () => {
  //     setShowing(false)
  //   }

  //   const handleClickOutside = (e: any) => {
  //     if (e.target !== document.children[0]) {
  //       if (
  //         !wrapperRef.current?.contains(e.target) &&
  //         !dataRef.current?.contains(e.target) &&
  //         !pickerRef.current?.contains(e.target) &&
  //         showing
  //       )
  //         collapseOwnDropdown()
  //     }
  //   }

  //   if (showing) {
  //     document.addEventListener("mousedown", handleClickOutside)
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside)
  //     }
  //   }
  // }, [wrapperRef, dataRef, pickerRef, showing])

  return (
    <C.SelectArea ref={wrapperRef}>
      {label && <C.Label>{label}</C.Label>}
      <S.DataArea ref={dataRef} onClick={togglePicker}>
        <C.Left>
          <C.SelectedInfo>{renderDate()}</C.SelectedInfo>
        </C.Left>
        <icons.Calendar />
      </S.DataArea>
      <S.PickerArea>
        <DatePicker
          className="picker-component"
          ref={pickerRef}
          open={showing}
          onChange={handleDate}
          minDate={dayjs(new Date())}
        />
      </S.PickerArea>
    </C.SelectArea>
  )
}

export default DateInput

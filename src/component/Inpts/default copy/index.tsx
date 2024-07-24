import React, { useRef, useState } from "react"
import * as S from "../styles"
import icons from "../../../assets/icons"
// import Calendar from "react-calendar"
import { parseDate } from "../../../utils/helpers/formatters/date"
import { formatPhone } from "../../../utils/helpers/formatters/phone"

type Props = {
  placeholder?: string
  label: string
  value: any
  onChange: (v: any) => void
  error?: {
    state: boolean
    message: string
  }
  isMonetary?: boolean
  isPhone?: boolean
  isDate?: boolean
}

const InputModal = ({
  label,
  value,
  onChange,
  error,
  isMonetary,
  isPhone,
  isDate,
}: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const [calendarShow, setCalendarShow] = useState(false)

  const handleDatePick = (v: any) => {
    onChange(new Date(v))
    collapseOwnDropdown()
  }

  const collapseOwnDropdown = () => {
    setCalendarShow(!calendarShow)
  }

  const handleClick = () => {
    if (isDate) {
      setCalendarShow(!calendarShow)
    } else {
      inputRef.current?.focus()
    }
  }

  const handleValue = (v: string) => {
    if (isPhone) {
      const maskedValue = formatPhone(v)
      onChange(maskedValue)
    } else onChange(v)
  }

  return (
    <S.InputArea $hasError={error?.state ?? false}>
      <S.SelectedArea onClick={handleClick} $hasError={error?.state ?? false}>
        <S.Left>
          <S.InpLine>
            <S.Label $hasError={error?.state ?? false}>{label}</S.Label>
            {isMonetary && <span>R$</span>}
            {isDate ? (
              <span className="dateText">{parseDate(value, "ddmmyyyy")}</span>
            ) : (
              <S.Input
                ref={inputRef}
                value={value}
                onChange={(e) => handleValue(e.target.value)}
                $hasError={error?.state ?? false}
              />
            )}
          </S.InpLine>
        </S.Left>
        {/* {isDate && <Icons.Calendar width={18} />} */}
      </S.SelectedArea>
      {/* {isDate && (
        <S.DropArea $visible={calendarShow}>
          <Calendar
            calendarType="gregory"
            showNeighboringCentury={false}
            showWeekNumbers={false}
            minDetail="year"
            value={value}
            onClickDay={(d) => handleDatePick(d)}
          />
        </S.DropArea>
      )} */}
      <span>{error?.state ? error?.message : ""}</span>
    </S.InputArea>
  )
}

export default InputModal

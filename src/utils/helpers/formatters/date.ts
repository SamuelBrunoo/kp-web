import { months } from "../../sys/date"
import { pad } from "./text"

type TFormats = "br" | "usa" | "ddm" | "ddmmyyyy" | "brdate" | "str"

export const parseDate = (date: Date | number | string, format?: TFormats) => {
  const d = new Date(date)

  switch (format) {
    case "ddm":
      return formatDateDDM(d)
    case "ddmmyyyy":
      return formatDateDDMMYYYY(d)
    case "brdate":
      return formatDatebrdate(d)
    case "str":
      return formatStrDate(d)
    default:
      return ""
  }
}

const formatStrDate = (date: Date) => {
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ]

  return `${pad(day)}, ${months[month].abb}, ${year}`
}

const formatDateDDM = (date: Date) => {
  const [day, month] = [date.getDate(), date.getMonth()]

  return `${pad(day)} de ${months[month].name.toLowerCase()}`
}

const formatDateDDMMYYYY = (date: Date) => {
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ]

  return `${pad(day)}/${pad(month)}/${year}`
}
const formatDatebrdate = (date: Date) => {
  const [day, month, year, hour, minute] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
  ]

  return `${pad(day)}/${pad(month)}/${year} - ${hour}:${minute}`
}

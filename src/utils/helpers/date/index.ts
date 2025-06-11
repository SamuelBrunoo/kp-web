import { months } from "../../sys/date"

export const getMinDeadline = (businessDays: number) => {
  const today = new Date()
  let businessDaysCount = 0
  let currentDate = new Date(today)

  while (businessDaysCount < businessDays) {
    currentDate.setDate(currentDate.getDate() + 1)
    const dayOfWeek = currentDate.getDay()

    // Conta apenas dias úteis (segunda a sexta)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDaysCount++
    }
  }

  return currentDate
}

export const getRelativeMonthName = (monthNumber?: number) => {
  let str = ""

  const currentMonthNumber = new Date().getMonth()

  let n = monthNumber ? currentMonthNumber + monthNumber : currentMonthNumber

  if (n < 0) n = 12 - -n
  else if (n > 11) n = n - 12

  str = months[n].name

  return str
}

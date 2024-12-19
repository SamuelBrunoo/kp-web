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

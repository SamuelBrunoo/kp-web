export type PDashboardCards = {
  monthlySells: PMonthlySells
  totalSells: PTotalSells
}

export type PMonthlySells = {
  current: number
  last: number
  past: number
}

export type PTotalSells = {
  balance: number
  sells: number
  spends: number
}

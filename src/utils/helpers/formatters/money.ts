export const formatMoney = (v: number) => {
  let value = "R$ "

  const integers = Math.floor(v / 100)
  const cents = v % 100

  value += integers
  value += `,${String(cents).padStart(2, "0")}`

  return value
}

// export const formatMoney = (v: string) => {
//   v = v.replace(/\D/g, "")

//   v = String(+v).padStart(3, "0")

//   const decimals = v.slice(v.length - 2)
//   const rest = v.slice(0, v.length - 2)

//   v = rest.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
//   v += `,${decimals}`

//   return v
// }

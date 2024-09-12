export const formatCep = (v: string) => {
  const nMask = v.replace(/\D/g, "")

  const f = nMask.replace(/(\d{1,5})(\d{1,3})?/, function (_regex, $1, $2) {
    return $1 + ($2 ? "-" + $2 : "")
  })

  return f.slice(0, 9)
}

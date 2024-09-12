export const formatStateRegister = (v: string) => {
  const nMask = v.replace(/\D/g, "")

  const f = nMask.replace(
    /(\d{3})(\d{1,3})?(\d{1,3})?/,
    function (_regex, $1, $2, $3) {
      return $1 + ($2 ? "." + $2 : "") + ($3 ? "." + $3 : "")
    }
  )

  return f.slice(0, 11)
}

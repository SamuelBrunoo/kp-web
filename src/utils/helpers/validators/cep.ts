export const cepValidator = (cep: string) => {
  let status = true

  const conditions = !!cep && cep.replace(/\D/g, "").length === 8

  if (!conditions) status = false

  return status
}

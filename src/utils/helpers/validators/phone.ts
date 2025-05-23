export const phoneValidator = (phone: string) => {
  let status = true

  const conditions =
    !!phone &&
    phone.replace(/\D/g, "").length >= 10 &&
    phone.replace(/\D/g, "").length < 12

  if (!conditions) status = false

  return status
}

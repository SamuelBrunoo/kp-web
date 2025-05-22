import { TOPStatus, TOPStatusWeight } from "../../@types/data/order"

export const getListOverralStatus = (list: any[]): TOPStatus => {
  let currentOrderStatusWeight = 1

  list.forEach((i) => {
    const statusWeight =
      TOPStatusWeight[i.status as keyof typeof TOPStatusWeight]
    currentOrderStatusWeight = Math.max(statusWeight, currentOrderStatusWeight)
  })

  const foundEntry = Object.entries(TOPStatusWeight).find(
    ([_, value]) => value === currentOrderStatusWeight
  )

  const orderStatusName: TOPStatus = foundEntry
    ? (foundEntry[0] as TOPStatus)
    : "queued"

  const newStatus: TOPStatus = orderStatusName

  return newStatus
}

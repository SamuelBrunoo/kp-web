import { TRoOption } from "../../@types/sys/roOptions"

export const parseRoOption = (
  list: any[],
  valueName: string,
  keyName: string
) => {
  let options: TRoOption[] = []

  list.forEach((item) => {
    const obj = {
      key: item[keyName],
      value: item[valueName],
    }

    options.push(obj)
  })

  const sorted = options.sort((a, b) =>
    a.value.toLowerCase().localeCompare(b.value.toLowerCase())
  )

  return sorted
}

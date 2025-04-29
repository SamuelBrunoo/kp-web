import ListVariation, { PListVariation } from "./variations/List"

// type TComponentType =
//   | "list"
//   | "lastThings"
//   | "lastOrders"
//   | "recipes"
//   | "horizontalPercentages"

type Props = {
  type: "list"
  title: string
  data: PListVariation["data"]
}

const RankingCard = ({ type, title, data }: Props) => {
  const getComponent = () => {
    let component: JSX.Element | null = null

    switch (type) {
      case "list":
        component = <ListVariation title={title} data={data} />
        break
      default:
        break
    }

    return component
  }

  return getComponent()
}

export default RankingCard

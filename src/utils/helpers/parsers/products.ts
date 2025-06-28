import { TNewOrder } from "../../@types/data/order"
import { TProduct } from "../../@types/data/product"

export const parseProdToOrderProduct = (product: any, products: TProduct[]) => {
  const p = products.find((p: TProduct) => p.id === product.id)

  const orderProdData = product
  const pData: TNewOrder["products"][number] | TProduct | undefined =
    orderProdData && p
      ? {
          ...p,
          quantity: product.quantity,
          storage: !p?.storage.has
            ? p?.storage
            : {
                ...p?.storage,
                quantity:
                  p?.storage.quantity - orderProdData?.quantity > -1
                    ? p?.storage.quantity - orderProdData?.quantity
                    : 0,
              },
        }
      : p

  return pData ? (pData as TNewOrder["products"][number]) : null
}

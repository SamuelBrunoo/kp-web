import { useCallback, useEffect, useState } from "react"
import * as S from "./styles"

import { tableConfig } from "../../utils/sys/table"

import PageHead from "../../components/PageHead"
import Table from "../../components/Table"

import { Api } from "../../api"
import ExpansibleRow from "../../components/ExpandRow"
import {
  TAttribution,
  TOrderPLDetailsProduct,
  TOrderPLDetailsProductListItem,
  TPageListProductionLine,
} from "../../utils/@types/data/productionLine"
import LoadingModal from "../../components/Modal/variations/Loading"
import { TOPStatus, TOPStatusWeight } from "../../utils/@types/data/order"
import { parseRoOption } from "../../utils/helpers/parsers/roOption"
import { TRoOption } from "../../utils/@types/sys/roOptions"
import getStore from "../../store"
import { useParams } from "react-router-dom"
import { getListOverralStatus } from "../../utils/helpers/parsers/status"

type TList =
  | TPageListProductionLine["order"][]
  | TPageListProductionLine["products"][]

const ProductionLinesPage = () => {
  const { id } = useParams()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [hasChanges, setHasChanges] = useState(false)

  const [, setProductionLinesControl] = useState<TList>([])

  const [responsableList, setResponsableList] = useState<TRoOption[]>([])

  const [productionLines, setProductionLines] = useState<TList>([])

  const [search, setSearch] = useState("")

  const removeProductionFromView = (plId: string) => {
    const newList: any = (productionLines as any[]).filter(
      (i: TList[number]) => i.id !== plId
    )
    setProductionLines(newList)
  }

  const handleSave = async (itemId: string) => {
    const item = (productionLines as any[]).find(
      (p: TList[number]) => p.id === itemId
    ) as TList[number]

    try {
      const updateData: {
        id: string
        products: TAttribution[]
      } = {
        id: item.id,
        products: item.details.attributions as TAttribution[],
      }

      const req = await Api.productionLines.updateProductionLine(updateData)

      if (req.ok) {
        if (req.data.status === "done") removeProductionFromView(itemId)

        controllers.feedback.setData({
          message: "Informações atualizadas com sucesso.",
          state: "success",
          visible: true,
        })

        setHasChanges(false)
      }
    } catch (error) {}
  }

  const onChangeResponsable = (
    plId: string,
    id: number,
    newProducerId: string
  ) => {
    try {
      if (!hasChanges) setHasChanges(true)

      const productionLineItem = (productionLines as any[]).find(
        (i: any) => i.id === plId
      )

      const rData = responsableList.find((i) => i.key === newProducerId)

      if (rData && productionLineItem) {
        const rInfo = { id: rData.key, name: rData.value }

        const newProductsList = productionLineItem.details.products.map(
          (i: any, key: number) =>
            key + 1 !== id
              ? i
              : { ...i, responsable: rInfo, attributedAt: new Date() }
        )

        const newAttributionsList = productionLineItem.details.attributions.map(
          (i: any, key: number) =>
            key + 1 !== id
              ? i
              : { ...i, responsable: rInfo, attributedAt: new Date() }
        )

        const newList: any[] = productionLines.map((i) =>
          i.id !== plId
            ? i
            : {
                ...i,
                details: {
                  ...i.details,
                  products: newProductsList,
                  attributions: newAttributionsList,
                },
              }
        )

        setProductionLines(newList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeStatus = (plId: string, id: number, newStatus: TOPStatus) => {
    if (!hasChanges) setHasChanges(true)

    const productionLineItem = (productionLines as any[]).find(
      (i: any) => i.id === plId
    )

    if (productionLineItem) {
      const newProductsList = productionLineItem.details.products.map(
        (i: TOrderPLDetailsProduct) => {
          let nl: TOrderPLDetailsProductListItem[] = []

          i.list.forEach((ii) => {
            const info =
              ii.lineNumber !== id ? ii : { ...ii, status: newStatus }
            nl.push(info)
          })

          const nItem: TOrderPLDetailsProduct = {
            ...i,
            list: nl,
            status: getListOverralStatus(nl),
          }
          return nItem
        }
      )
      const newAttributionsList = productionLineItem.details.attributions.map(
        (i: any, key: number) =>
          key + 1 !== id
            ? i
            : {
                ...i,
                status: newStatus,
              }
      )

      const newPlData = {
        ...productionLineItem,
        details: {
          ...productionLineItem.details,
          products: newProductsList,
          attributions: newAttributionsList,
        },
      }

      const newProductionStatus = getUpdatedOrderStatus(newPlData)

      const newList: any[] = productionLines.map((i) =>
        i.id !== plId ? i : { ...newPlData, status: newProductionStatus }
      )

      setProductionLines(newList)
    }
  }

  const getUpdatedOrderStatus = (pl: TList[number]) => {
    // Order Status
    let currentOrderStatusWeight = 1
    pl.details.attributions.forEach((p) => {
      const statusWeight = TOPStatusWeight[p.status as TOPStatus]

      currentOrderStatusWeight = Math.max(
        statusWeight,
        currentOrderStatusWeight
      )
    })

    const orderStatusName = (
      Object.entries(TOPStatusWeight).find(
        ([, value]) => value === currentOrderStatusWeight
      ) as any
    )[0] as TOPStatus

    const orderStatus = orderStatusName

    return orderStatus
  }

  /*
   * Initial Loading
   */

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.productionLines.getProductionLinesPageList({
        showType: "orders",
      })

      if (req.ok) {
        const list = req.data.list
        const parsedResponsables = parseRoOption(req.data.workers, "name", "id")

        setProductionLinesControl(list)
        setProductionLines(list)
        setResponsableList(parsedResponsables)
      } else {
        controllers.feedback.setData({
          message: req.error.message,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um erro ao carregar as informações. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <LoadingModal visible={loading} />

      <PageHead
        title={"Linha de produção"}
        search={search}
        onChangeSearch={setSearch}
        // buttons={[{ role: "new", text: "Novo", onClick: handleNew }]}
        withoutNewButton={true}
      />

      {/* TODO: Tabs */}

      {/* Table */}
      <Table
        pageAutoFocusId={id}
        config={tableConfig.productionLines}
        data={productionLines}
        search={search}
        searchFields={["orderCode", "clientName"]}
        expandComponent={(item) => (
          <ExpansibleRow.ProductionLineExpand
            onChangeResponsable={onChangeResponsable}
            onChangeStatus={onChangeStatus}
            hasChanges={hasChanges}
            handleSave={hasChanges ? handleSave : async () => {}}
            responsableList={responsableList}
            item={item}
          />
        )}
      />
    </S.Content>
  )
}

export default ProductionLinesPage

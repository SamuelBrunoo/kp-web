import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import { useEffect, useRef, useState } from "react"

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { theme } from "../../theme"

type Props = {
  pageAutoFocusId?: string
  config: TConfig
  data: any[]
  actions?: {
    [key: string]: (...props: any[]) => void | any
  }
  extra?: {
    [key: string]: any
  }
  noHover?: boolean
  search?: string
  searchFields?: string[]
  expandComponent?: (item: any) => JSX.Element
  itemColor?: string
}

const Table = ({
  pageAutoFocusId,
  config,
  data = [],
  noHover,
  actions,
  extra,
  search,
  searchFields,
  expandComponent,
  itemColor,
}: Props) => {
  return (
    <S.Wrapper>
      <MuiTable
        sx={{
          "& th": {
            borderBottom: "none",
          },
          "& td": {
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          <TableRow>
            {config.columns.map((col, colKey) =>
              col.field !== "actions" ||
              (col.field === "actions" &&
                actions &&
                Object.keys(actions).length > 0) ? (
                <TableCell
                  key={colKey}
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.green[460],
                    whiteSpace: "nowrap",
                    [`@media (max-width:${theme.bp.small}px)`]: {
                      display:
                        col.hideOn && col.hideOn.includes("small")
                          ? "none"
                          : undefined,
                    },
                  }}
                  align={col.align}
                >
                  {col.title}
                </TableCell>
              ) : null
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((item) => {
              let ok = false

              if (!!search) {
                searchFields?.forEach((sf) => {
                  if (!ok) {
                    const v = sf.includes(".")
                      ? item[sf.split(".")[0]][sf.split(".")[1]]
                      : item[sf]

                    ok = String(v).toLowerCase().includes(search.toLowerCase())
                  }
                })
              } else ok = true

              return ok
            })
            .map((item, itemKey) => (
              <RowItem
                pageAutoFocusId={pageAutoFocusId}
                key={itemKey}
                item={item}
                config={config}
                actions={actions}
                extra={extra}
                expandComponent={expandComponent}
                noHover={noHover}
                itemColor={itemColor}
              />
            ))}
        </TableBody>
      </MuiTable>
    </S.Wrapper>
  )
}

type TRowItemProps = {
  pageAutoFocusId?: string
  item: any
  config: TConfig
  actions: Props["actions"]
  extra: Props["extra"]
  expandComponent?: any
  noHover?: boolean
  itemColor?: Props["itemColor"]
}

const RowItem = (props: TRowItemProps) => {
  const {
    item,
    config,
    actions,
    expandComponent,
    noHover,
    extra,
    itemColor,
    pageAutoFocusId,
  } = props

  const itemRowRef = useRef<HTMLTableRowElement | null>(null)
  const expandableRef = useRef<HTMLTableRowElement | null>(null)

  const [isExpanded, setIsExpanded] = useState(pageAutoFocusId === item.id)

  const toggleExpand = () => {
    const shouldAdd = !expandableRef.current?.classList.contains("highlighted")

    console.log(`[DEBUG] Should add: `, shouldAdd)
  
    document
      .querySelectorAll("tr.highlighted")
      .forEach(el => {
        el.classList.remove("highlighted")
        el.classList.add("noBg")
      })

    if (shouldAdd) {
      expandableRef.current?.classList.add("highlighted")
      expandableRef.current?.classList.remove("noBg")
      itemRowRef.current?.classList.add("highlighted")
      itemRowRef.current?.classList.remove("noBg")
    }
  }

  useEffect(() => {
    if (expandableRef.current) {
      const newStatus = !(isExpanded || expandableRef.current.classList.contains("highlighted"))
      setIsExpanded(newStatus)

      console.log("New Status: ", newStatus)
      
      if (newStatus) expandableRef.current.classList.remove("noBg")
      else expandableRef.current.classList.add("noBg")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandableRef.current?.classList])

  return (
    <>
      <TableRow
        hover={!noHover}
        ref={itemRowRef}
        sx={{
          cursor: noHover ? "default" : "pointer",
          transition: "background-color 0.3s",
          backgroundColor: "transparent",
          "&.highlighted": {
            backgroundColor: '#F5F5F5',
          },
          "& td:nth-child(1)": {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          "& td:nth-last-child(1)": {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
          "&:hover": {
            backgroundColor: (theme) =>
              `${theme.palette.neutral[800]} !important`,
            ".actions-area": {
              opacity: 1,
            },
          },
        }}
      >
        {config.columns.map((col, k) => {
          let content: any = null

          const field = config.specialFields[col.field]

          content = field
            ? field(item, {
                data: {
                  size: col.size as number,
                },
                callbacks: { ...actions },
                extra: { ...extra },
              })
            : item[col.field]

          return col.field !== "actions" ||
            (col.field === "actions" &&
              actions &&
              Object.keys(actions).length > 0) ? (
            <TableCell
              key={k}
              sx={{
                width: col.width ? +col.width.replace("px", "") : undefined,
                cursor: noHover ? "default" : "pointer",
                color: itemColor ?? theme.colors.neutral[300],
                whiteSpace: "nowrap",
                [`@media (max-width:${theme.bp.small}px)`]: {
                  display:
                    col.hideOn && col.hideOn.includes("small")
                      ? "none"
                      : undefined,
                },
              }}
              align={col.align}
              onClick={
                col.field !== "actions" ||
                (expandComponent && k !== config.columns.length - 1)
                  ? toggleExpand
                  : undefined
              }
              className={col.field === "actions" ? "actions-area" : ""}
            >
              {config.specialFields[col.field] &&
              col.field !== "statusIndicator" ? (
                <Typography
                  fontSize={14}
                  align={col.align}
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: col.align ?? undefined,
                  }}
                >
                  {content}
                </Typography>
              ) : (
                content
              )}
            </TableCell>
          ) : null
        })}
      </TableRow>
      {config.isExpandable && expandComponent && (
        <S.RowExpandable ref={expandableRef} className="noBg">
          <S.REWrapper colSpan={6}>
            <S.REBox className="rowExpandableBox">
              <S.REContainer>{expandComponent(item)}</S.REContainer>
            </S.REBox>
          </S.REWrapper>
        </S.RowExpandable>
      )}
    </>
  )
}

export default Table

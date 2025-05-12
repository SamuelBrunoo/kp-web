import * as S from "./styles"
import { TConfig } from "../../utils/sys/table"
import { useState } from "react"

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

  const [isExpanded, setIsExpanded] = useState(pageAutoFocusId === item.id)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <>
      <TableRow
        hover={!noHover}
        sx={{
          cursor: noHover ? "default" : "pointer",
          transition: "background-color 0.3s",
          backgroundColor: (theme) =>
            isExpanded ? theme.palette.neutral[800] : "transparent",
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
                  style={{ textAlign: col.align ?? undefined }}
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
        <S.RowExpandable className={isExpanded ? "highlighted" : "noBg"}>
          <S.REWrapper colSpan={6}>
            <S.REBox $visible={isExpanded}>
              <S.REContainer>{expandComponent(item)}</S.REContainer>
            </S.REBox>
          </S.REWrapper>
        </S.RowExpandable>
      )}
    </>
  )
}

export default Table

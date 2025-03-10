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

type Props = {
  config: TConfig
  data: any[]
  actions?: {
    [key: string]: (...props: any[]) => void | any
  }
  noHover?: boolean
  search?: string
  searchFields?: string[]
  expandComponent?: (item: any) => JSX.Element
}

const Table = ({
  config,
  data = [],
  noHover,
  actions,
  search,
  searchFields,
  expandComponent,
}: Props) => {
  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {config.columns.map((col, colKey) => (
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
          ))}
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
              key={itemKey}
              item={item}
              config={config}
              actions={actions}
              expandComponent={expandComponent}
              noHover={noHover}
            />
          ))}
      </TableBody>
    </MuiTable>
  )
}

type TRowItemProps = {
  item: any
  config: TConfig
  actions: Props["actions"]
  expandComponent?: any
  noHover?: boolean
}

const RowItem = (props: TRowItemProps) => {
  const { item, config, actions, expandComponent, noHover } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <>
      <TableRow
        hover={!noHover}
        sx={{
          transition: "background-color 0.3s",
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
              })
            : item[col.field]

          return (
            <TableCell
              key={k}
              sx={{
                cursor:
                  expandComponent && k !== config.columns.length - 1
                    ? "pointer"
                    : undefined,
              }}
              align={col.align}
              // $width={col.width}
              onClick={
                expandComponent && k !== config.columns.length - 1
                  ? toggleExpand
                  : undefined
              }
              className={col.field === "actions" ? "actions-area" : ""}
            >
              {config.specialFields[col.field] ? (
                <Typography fontSize={14}>{content}</Typography>
              ) : (
                content
              )}
            </TableCell>
          )
        })}
      </TableRow>
      {config.isExpandable && expandComponent && (
        <S.RowExpandable className={isExpanded ? "highlighted noBg" : "noBg"}>
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

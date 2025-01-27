import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Table = styled.table`
  border-spacing: 0;
`

export const TableHead = styled.thead`
  border-collapse: collapse;
`

export const TCol = styled.th<{
  $size?: string | number
  $align?: string
  $width?: string
}>`
  width: ${({ $width }) => $width ?? "unset"};
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 400;
  padding: 13px 12px;
  color: ${({ theme }) => theme.colors.green[260]};
`

export const TableBody = styled.tbody<{ $noHover?: boolean }>`
  border-collapse: collapse;

  tr {
    transition: background-color 0.3s, opacity 0.3s;
    border-radius: 4px;
    overflow: hidden;

    &:not(.noHover):hover {
      ${({ $noHover, theme }) =>
        $noHover ? "" : `background-color: ${theme.colors.neutral[800]};`}

      .actions-area {
        opacity: 1;
      }
    }

    &.noBg,
    &.noBg:hover {
      opacity: 0.4;
    }
  }

  &:has(.highlighted) {
    tr:not(.highlighted):not(.normal) {
      opacity: 0.2;
    }
  }
`

export const RowItem = styled.tr<{ $noHover?: boolean }>`
  cursor: ${({ $noHover }) => ($noHover ? "unset" : "pointer")};

  &:nth-last-child(1) {
    td {
      border: none;
    }
  }

  &.highlighted {
    opacity: 1;
    z-index: 2;
  }
`

export const BoxWrapper = styled.div``

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 8px 32px 16px;
`

export const RowExpandable = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0px;
  cursor: unset;
`

export const REWrapper = styled.td`
  color: inherit;
  vertical-align: middle;
  outline: 0px;
`

export const REBox = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-rows: ${({ $visible }) => ($visible ? 1 : 0)}fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s;
`

export const REContainer = styled.div`
  min-height: 0;
  padding: 0 12px;
`

export const ItemData = styled.td<{
  $align?: string
  $hasPointer?: boolean
  $width?: string
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 300;
  padding: 12px;
  border-left: none;
  border-right: none;
  cursor: ${({ $hasPointer }) => ($hasPointer ? "pointer" : "unset")};
  width: ${({ $width }) => $width ?? "unset"};
`

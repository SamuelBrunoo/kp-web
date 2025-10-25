import styled from "styled-components"

export const Wrapper = styled.div`
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    overflow: auto;
  }
`

export const TableHead = styled.thead`
  border-collapse: collapse;
`

export const TableBody = styled.tbody<{ $noHover?: boolean }>`
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.neutral[300]};

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

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    tr td p .actions-area {
      background: orange;
      opacity: 1 !important;
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

  &.highlighted {
    td {
      background-color: ${({ theme }) => theme.colors.neutral[800]};
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
  
      .rowExpandableBox {
        grid-template-rows: 1fr;
      }
    }
  }
`

export const REWrapper = styled.td`
  color: inherit;
  vertical-align: middle;
  outline: 0px;
  transition: background-color 0.3s;
`

export const REBox = styled.div`
  display: grid;
  grid-template-rows: 0fr;
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

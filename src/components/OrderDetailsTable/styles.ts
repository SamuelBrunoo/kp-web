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
  border-radius: 6px;
  border-spacing: 0;
`

export const TableHead = styled.thead`
  border-collapse: collapse;
`

export const TCol = styled.th<{
  $size?: string | number
  $align?: string
  $width?: string
  $hideOnMobile?: boolean
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 400;
  padding: 12px 4px;
  color: ${({ theme }) => theme.colors.green[360]};
  width: ${({ $width }) => $width ?? "unset"};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    ${({ $hideOnMobile }) => ($hideOnMobile ? "display: none;" : "")};
  }
`

export const TableBody = styled.tbody<{ $noHover?: boolean }>`
  border-collapse: collapse;
  opacity: 1;

  tr {
    &:hover {
      background-color: transparent;
    }
  }
`

export const RowItem = styled.tr`
  &.totals {
    td {
      padding-top: 36px;
    }
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

  &.normal {
    opacity: 1;
  }
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
  $hideOnMobile?: boolean
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 300;
  padding: 4px;
  border: none;
  cursor: ${({ $hasPointer }) => ($hasPointer ? "pointer" : "unset")};
  width: ${({ $width }) => $width ?? "unset"};
  color: ${({ theme }) => theme.colors.neutral[300]};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    ${({ $hideOnMobile }) => ($hideOnMobile ? "display: none;" : "")};
  }
`

export const ResumeProductsData = styled.td<{
  $align?: string
  $hasPointer?: boolean
  $hideOnMobile?: boolean
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 500;
  padding: 4px;
  border: none;
  cursor: ${({ $hasPointer }) => ($hasPointer ? "pointer" : "unset")};
  color: ${({ theme }) => theme.colors.green[360]};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    ${({ $hideOnMobile }) => ($hideOnMobile ? "display: none;" : "")};
  }
`

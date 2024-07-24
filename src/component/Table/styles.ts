import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Table = styled.table`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.green.lighter};
  border-spacing: 0;
`

export const TableHead = styled.thead`
  border-collapse: collapse;
`

export const TCol = styled.th<{ $size?: string | number; $align?: string }>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 400;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green.lighter};
`

export const TableBody = styled.tbody`
  border-collapse: collapse;

  tr {
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.green.lighter};

      .actions-area {
        opacity: 1;
      }
    }
  }
`

export const RowItem = styled.tr`
  &:nth-last-child(1) {
    td {
      border: none;
    }
  }
`

export const ItemData = styled.td<{ $align?: string }>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 300;
  padding: 12px;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green.lighter};
`

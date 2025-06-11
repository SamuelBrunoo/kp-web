import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  width: 100%;
`

export const GroupTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.orange[360]};
`

export const FormLine = styled.div`
  display: flex;
  gap: 16px;
  width: fit-content;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const GridWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
`

export const PrintGrid = styled.div<{ $columns: number; $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[600]};
  padding: 24px;
  border-radius: 8px;
`

export const Slot = styled.div<{ $active: boolean }>`
  min-width: 12px;
  min-height: 8px;
  padding: 4px;
  aspect-ratio: 12/4;
  border-radius: 4px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.neutral[800] : theme.colors.neutral[700]};
  cursor: pointer;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`

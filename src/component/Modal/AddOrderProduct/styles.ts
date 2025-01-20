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
  width: fit-content;
`

export const QuantityAlert = styled.span<{ $showing: boolean }>`
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.green[400]};
  opacity: ${({ $showing }) => ($showing ? 1 : 0)};
  transition: opacity 0.3s;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`

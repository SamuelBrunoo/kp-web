import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

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

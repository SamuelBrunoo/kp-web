import styled from "styled-components"

export const ModalBox = styled.div`
  padding: 24px;
`

export const ModalTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ModalTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green[260]};
`

export const ModalSubTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange[360]};
`

import styled from "styled-components"

export const ModalBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white.main};
  width: fit-content;
  min-width: 540px;
  border-radius: 12px;
  padding: 24px;
  margin: auto;
  outline: none;
`

export const ModalTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`

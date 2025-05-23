import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    padding-bottom: 56px;
  }
`

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`

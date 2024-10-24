import styled from "styled-components"

export const Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 10px;
`

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
`

export const IGTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black.main};
`

export const AdditionalInfosArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const AIRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 24px;
`
import styled from "styled-components"

export const Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 -8px 0px 0px;
  width: 100%;
  padding: 0 48px;
`

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

export const IGTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
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

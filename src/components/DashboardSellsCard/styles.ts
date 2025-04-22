import styled from "styled-components"

export const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
`

export const CardTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[300]};
`

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const MainInfoTitle = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.neutral[200]};
`

export const MainInfoValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green[400]};
`

export const OthersInfosArea = styled.div`
  display: flex;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[600]};
  gap: 24px;
`

export const OtherInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

export const OtherInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const OtherInfoTitle = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.neutral[200]};
`

export const OtherInfoValue = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.green[400]};
`

export const Divider = styled.div`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[600]};
`

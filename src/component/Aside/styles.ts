import styled from "styled-components"

export const Component = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 280px;
  border-right: 1px solid ${({ theme }) => theme.colors.green[200]};
`

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 128px;
`

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 32px - 12px);
`

export const UserName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green[200]};
`

export const UserEmail = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.green[260]};
`

export const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

import styled from "styled-components"

export const Component = styled.div`
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  max-width: 220px;
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
  gap: 32px;
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const UserProfile = styled.div<{ img?: string }>`
  min-width: 32px;
  min-height: 32px;
  border-radius: 32px;
  background-color: #d9d9d9;
`

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 32px - 12px);
`

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
`

export const UserEmail = styled.span`
  font-size: 10px;
  color: #d9d9d9;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
`

export const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const MenuItem = styled.div`
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.colors.white.main};

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.colors.green.lighter};
  }

  svg {
    width: 16px;
    height: 16px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black.main};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
  }
`

export const MenuTitle = styled.span`
  font-size: 14px;
`

import styled from "styled-components"

export const Component = styled.div`
  max-width: 240px;
`

export const MainContent = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  gap: 8px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.green[460] : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.neutral[800] : theme.colors.neutral[400]};
  border-radius: 6px;

  a {
    text-decoration: none;
    color: unset;
  }
`

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: currentColor;
`

export const MainTitle = styled.span`
  font-size: 16px;
  color: currentColor;
`

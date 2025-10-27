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

export const List = styled.ul`
  list-style: none;
`

export const ListItem = styled.li`
  display: flex;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.3s;
  
  a {
    flex: 1;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 8px;
    cursor: pointer;
  }

  &:nth-last-of-type(1) {
    margin: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[900]};
  }
`

export const ListItemContent = styled.div`
`

export const InfoArea = styled.div<{
  $fill?: boolean
  $align: "left" | "right"
}>`
  display: flex;
  flex-direction: column;
  flex: ${({ $fill }) => ($fill ? 1 : "unset")};
  align-items: ${({ $align }) =>
    $align === "left" ? "flex-start" : "flex-end"};
`

export const Info = styled.span<{
  $role: "id" | "text" | "value"
  $fill?: boolean
}>`
  width: ${({ $role }) => ($role === "id" ? "36px" : "unset")};
  flex: ${({ $fill }) => ($fill ? 1 : "unset")};
  color: ${({ $role, theme }) =>
    $role === "id"
      ? theme.colors.neutral[200]
      : $role === "text"
      ? theme.colors.green[460]
      : $role === "value"
      ? theme.colors.orange[460]
      : theme.colors.neutral[600]};
  font-weight: ${({ $role }) =>
    $role === "id" || $role === "text" || $role === "value" ? 600 : 300};
  text-align: left;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    font-size: 14px;
  }
`

export const OrderInfo = styled.span<{
  $role: "primary" | "secondary" | "tertiary"
}>`
  flex: 1;
  color: ${({ $role, theme }) =>
    $role === "primary"
      ? theme.colors.orange[460]
      : $role === "secondary"
      ? theme.colors.green[460]
      : theme.colors.neutral[500]};
  font-weight: ${({ $role }) =>
    $role === "primary" || $role === "secondary" ? 500 : 400};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    font-size: 14px;
  }
`

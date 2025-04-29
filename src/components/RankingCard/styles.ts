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
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  margin-bottom: 8px;

  &:nth-last-of-type(1) {
    margin: 0;
  }
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
`

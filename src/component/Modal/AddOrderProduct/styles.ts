import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  width: 100%;
`

export const GroupTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black.main};
`

export const FormLine = styled.div`
  display: flex;
  gap: 16px;
  width: fit-content;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
`

export const QuantityAlert = styled.span<{ $showing: boolean }>`
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.green.strong};
  opacity: ${({ $showing }) => ($showing ? 1 : 0)};
  transition: opacity 0.3s;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`

export const Button = styled.button<{ $role: "cancel" | "save" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  outline: none;
  background-color: ${({ $role, theme }) =>
    $role === "cancel" ? theme.colors.white.main : theme.colors.blue.pastel};
  border: 1px solid
    ${({ $role, theme }) =>
      $role === "cancel" ? theme.colors.orange.main : theme.colors.blue.pastel};
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ $role, theme }) =>
    $role === "cancel" ? theme.colors.orange.main : theme.colors.white.main};

  svg {
    width: 16px;
    height: 16px;
  }
`

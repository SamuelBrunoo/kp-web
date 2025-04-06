import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Action = styled.button<{ $role: "edit" | "trash" }>`
  display: grid;
  place-items: center;
  padding: 4px;
  cursor: pointer;
  background: none;
  border: none;

  color: ${({ $role, theme }) =>
    $role === "edit" ? theme.colors.orange[560] : theme.colors.red[460]};
`

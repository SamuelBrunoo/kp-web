import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  width: fit-content;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Action = styled.button<{
  $role: "edit" | "trash" | "extra"
  $disabled?: boolean
}>`
  display: grid;
  place-items: center;
  padding: 4px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  background: none;
  border: none;

  filter: saturate(${({ $disabled }) => ($disabled ? 0 : 1)});

  color: ${({ $role, theme }) =>
    $role === "edit"
      ? theme.colors.orange[560]
      : $role === "extra"
      ? theme.colors.green[460]
      : theme.colors.red[460]};
`

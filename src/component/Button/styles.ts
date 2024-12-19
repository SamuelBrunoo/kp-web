import styled from "styled-components"

export const Button = styled.button<{
  $type?: "primary" | "secondary" | "tertiary"
  $color: "green" | "red" | "orange" | "blue"
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  outline: none;
  background-color: ${({ $type, $color, theme }) =>
    $type === "primary"
      ? $color === "green"
        ? theme.colors.green.strong
        : $color === "orange"
        ? theme.colors.orange.main
        : $color === "red"
        ? theme.colors.red.main
        : theme.colors.blue
      : "transparent"};
  border: 1px solid
    ${({ $type, $color, theme }) =>
      $type !== "tertiary"
        ? $color === "green"
          ? theme.colors.green.strong
          : $color === "orange"
          ? theme.colors.orange.main
          : $color === "red"
          ? theme.colors.red.main
          : theme.colors.blue
        : "transparent"};
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white.main};

  svg {
    width: 16px;
    height: 16px;
  }
`

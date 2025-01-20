import styled from "styled-components"

export const Button = styled.button<{
  $type: "primary" | "secondary" | "tertiary"
  $color: "green" | "red" | "orange" | "blue"
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  outline: none;
  background-color: ${({ $type, $color, theme }) =>
    $type === "primary"
      ? $color === "green"
        ? theme.colors.green[300]
        : $color === "orange"
        ? theme.colors.orange[300]
        : $color === "red"
        ? theme.colors.red[300]
        : theme.colors.blue[300]
      : "transparent"};
  border: 1px solid
    ${({ $type, $color, theme }) =>
      $type !== "tertiary"
        ? $color === "green"
          ? theme.colors.green[300]
          : $color === "orange"
          ? theme.colors.orange[300]
          : $color === "red"
          ? theme.colors.red[300]
          : theme.colors.blue[300]
        : "transparent"};
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[800]};

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    font-size: 14px;

    ${({ $type, $color, theme }) =>
      $type !== "tertiary"
        ? $color === "green"
          ? theme.colors.neutral[800]
          : $color === "orange"
          ? theme.colors.orange[300]
          : $color === "red"
          ? theme.colors.red[300]
          : theme.colors.blue[300]
        : "transparent"};
  }
`

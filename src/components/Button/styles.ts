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
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;

  color: ${({ $type, $color, theme }) => {
    const colorRelation = {
      green: theme.colors.green[300],
      orange: theme.colors.orange[300],
      red: theme.colors.red[300],
      blue: theme.colors.blue[300],
    }

    const color =
      $type === "primary" ? theme.colors.neutral[800] : colorRelation[$color]

    return color
  }};

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    font-size: 14px;
  }
`

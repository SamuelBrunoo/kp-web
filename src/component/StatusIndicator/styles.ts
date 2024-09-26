import styled from "styled-components"
import { TOPStatus } from "../../utils/@types/data/order"

export const Box = styled.div<{ $status: TOPStatus }>`
  display: grid;
  place-items: center;
  width: 152px;
  height: 24px;
  border-radius: 6px;
  background-color: ${({ $status, theme }) =>
    $status === "lor"
      ? theme.colors.red.pastel
      : $status === "done"
      ? theme.colors.green.lighter
      : $status === "doing"
      ? theme.colors.blue.pastel
      : $status === "queued"
      ? theme.colors.orange.pastel
      : "currentColor"};
  color: ${({ $status, theme }) =>
    $status === "lor"
      ? theme.colors.red.main
      : $status === "done"
      ? theme.colors.green.strong
      : $status === "doing"
      ? theme.colors.blue.main
      : $status === "queued"
      ? theme.colors.orange.main
      : "currentColor"};
`

export const Text = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: currentColor;
`

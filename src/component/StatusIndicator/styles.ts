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
      ? theme.colors.red[630]
      : $status === "done"
      ? theme.colors.green[630]
      : $status === "doing"
      ? theme.colors.blue[630]
      : $status === "queued"
      ? theme.colors.orange[530]
      : "currentColor"};
  color: ${({ $status, theme }) =>
    $status === "lor"
      ? theme.colors.red[600]
      : $status === "done"
      ? theme.colors.green[630]
      : $status === "doing"
      ? theme.colors.blue[400]
      : $status === "queued"
      ? theme.colors.orange[400]
      : "currentColor"};
`

export const Text = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: currentColor;
`

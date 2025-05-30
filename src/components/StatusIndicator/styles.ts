import styled from "styled-components"
import { TOPStatus } from "../../utils/@types/data/order"

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  place-items: center;
  position: relative;
`

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
      ? theme.colors.green[600]
      : $status === "doing"
      ? theme.colors.blue[400]
      : $status === "queued"
      ? theme.colors.orange[400]
      : "currentColor"};

  cursor: pointer;
`

export const Text = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: currentColor;
`

export const Dropdown = styled.div<{ $opened: boolean }>`
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  background-color: rgba(250, 250, 250, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid #dedede;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  min-width: 140px;
  text-align: center;
  transform-origin: center center;
  display: flex;
  align-items: center;

  opacity: ${({ $opened }) => ($opened ? 1 : 0)};
  transform: ${({ $opened }) => ($opened ? "scale(1)" : "scale(0.8)")};
  pointer-events: ${({ $opened }) => ($opened ? "auto" : "none")};
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
`

export const Option = styled.div<{ $status: TOPStatus }>`
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    span {
      color: ${({ $status, theme }) =>
        $status === "lor"
          ? theme.colors.red[600]
          : $status === "done"
          ? theme.colors.green[600]
          : $status === "doing"
          ? theme.colors.blue[400]
          : $status === "queued"
          ? theme.colors.orange[400]
          : "currentColor"};
    }
  }

  span {
    white-space: nowrap;
    transition: color 0.3s;
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
`

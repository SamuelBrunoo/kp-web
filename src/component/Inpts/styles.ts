import styled from "styled-components"

export const InputArea = styled.div<{
  $disabled?: boolean
  $hasError: boolean
}>`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s;

  span {
    color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.red[460] : "transparent"};
    transition: color 0.3s;
    position: absolute;
    margin-left: 4px;
    top: 100%;
    font-size: 0.8rem;
  }

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: default;
`

export const SelectedArea = styled.div<{
  $hasError: boolean
  $cursorNormal?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 240px;
  width: fit-content;
  cursor: ${({ $cursorNormal }) => ($cursorNormal ? "unset" : "pointer")};
  transition: background-color 0.3s, border-color 0.3s;
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

export const InpLine = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  padding: 16px 0 0;
  flex: 1;
  width: 100%;
  font-size: 12px;

  span {
    font-size: 0.875em;
    white-space: nowrap;
  }

  &:has(input:focus) label,
  &:has(span.dateText) label,
  &:not(:has(input[value=""])) label {
    top: 0px;
    left: 0px;
    font-size: 12px;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[100]};
    position: static;
  }
`

export const Label = styled.label<{ $hasError: boolean }>`
  position: absolute;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.red[460] : theme.colors.green[360]};
  white-space: nowrap;
  top: 25px;
  left: 10px;
  transition: left 0.3s, top 0.3s, font-size 0.3s, color 0.3s;
  font-weight: 300;
`

export const ValueArea = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
`

export const Input = styled.input<{ $hasError: boolean }>`
  background-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.red[630] : theme.colors.neutral[800]};
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.red[460] : theme.colors.neutral[100]};
  font-size: inherit;
  font-weight: 300;
  white-space: nowrap;
  outline: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  flex: 1;
  transition: color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.neutral[100]};
  font-size: inherit;
  font-weight: 300;
  white-space: nowrap;
  padding: 8px;
  display: block;
  flex: 1;
  transition: color 0.3s;
`

export const DropArea = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.neutral[900]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 2;
  padding: 12px;

  &.visible {
    display: block;
  }
`

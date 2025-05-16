import styled from "styled-components"
import { FormField } from "../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $alignBottom?: boolean
  $fixedWidth?: number
  $zIndex?: number
}>`
  grid-column: span
    ${({ $gridSizes }) => $gridSizes?.big ?? "unset"};

  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  /* display: flex; */
  align-self: ${({ $alignBottom }) => ($alignBottom ? "flex-end" : "unset")};
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex ?? "unset"};

  ${({ $fixedWidth }) =>
    $fixedWidth
      ? `
    min-width: ${$fixedWidth}px;
    max-width: ${$fixedWidth}px;
    width: ${$fixedWidth}px;
  `
      : ""}

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span
      ${({ $gridSizes }) => $gridSizes?.small ?? $gridSizes?.big ?? "unset"};
    flex: unset;

    min-width: unset;
    max-width: unset;
    width: unset;
  }
`

export const Area = styled.div<{ $elevation?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  z-index: ${({ $elevation }) => 100 - ($elevation ?? 90)};
`

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
  /* min-width: 240px; */
  /* width: fit-content; */
  cursor: ${({ $cursorNormal }) => ($cursorNormal ? "unset" : "pointer")};
  transition: background-color 0.3s, border-color 0.3s;
`

export const Left = styled.div<{
  $cursorNormal?: boolean
}>`
  display: flex;
  flex-direction: column;
  /* min-width: 240px; */
  gap: 4px;
  flex: 1;
  cursor: ${({ $cursorNormal }) => ($cursorNormal ? "unset" : "pointer")};
`

export const InpLine = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  padding: 16px 0 0;
  flex: 1;
  width: 100%;
  font-size: 14px;

  span {
    font-size: 0.875em;
    white-space: nowrap;
  }

  &:has(input:focus) label,
  &:has(span.dateText) label,
  &:not(:has(input[value=""])) label {
    top: -4px;
    left: 0px;
    font-size: 14px;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[100]};
    position: static;
  }
`

export const Label = styled.label<{
  $hasError: boolean
  $color?: "green" | "orange"
}>`
  position: absolute;
  color: ${({ $hasError, $color, theme }) =>
    $hasError
      ? theme.colors.red[460]
      : $color === "orange"
      ? theme.colors.orange[360]
      : theme.colors.green[360]};
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
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.red[460] : theme.colors.neutral[100]};
  font-size: inherit;
  font-weight: 300;
  white-space: nowrap;
  outline: none;
  border: none;
  padding: 9px 10px;
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
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 2;
  padding: 12px;

  &.visible {
    display: block;
  }
`

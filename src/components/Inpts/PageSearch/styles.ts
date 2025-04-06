import styled from "styled-components"

export const InputArea = styled.div<{
  $disabled?: boolean
  $hasError: boolean
}>`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  transition: opacity 0.3s;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: 8px;

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: default;
`

export const MainArea = styled.div<{
  $hasError: boolean
  $cursorNormal?: boolean
}>`
  flex: 1;
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

export const InpLine = styled.div`
  position: relative;
  display: flex;
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
    $hasError ? theme.colors.red[460] : theme.colors.neutral[500]};
  white-space: nowrap;
  top: 25px;
  left: 10px;
  transition: top 0.3s, font-size 0.3s, color 0.3s;
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
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  background: none;
  outline: none;
  border: none;
  flex: 1;
  transition: color 0.3s;
  padding: 9.5px 8px;
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

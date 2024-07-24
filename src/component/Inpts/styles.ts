import styled from "styled-components"

export const InputArea = styled.div<{ $hasError: boolean }>`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;

  span {
    color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.red.main : "transparent"};
    transition: color 0.3s;
    position: absolute;
    margin-left: 4px;
    top: 100%;
    font-size: 0.8rem;
  }
`

export const SelectedArea = styled.div<{ $hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 240px;
  width: fit-content;
  cursor: pointer;
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
    font-size: 12px;
  }

  span {
    color: ${({ theme }) => theme.colors.black.main};
    position: static;
  }
`

export const Label = styled.label<{ $hasError: boolean }>`
  position: absolute;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.red.main : theme.colors.grey.main};
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
    $hasError ? theme.colors.red.main : theme.colors.black.main};
  font-size: inherit;
  font-weight: 300;
  white-space: nowrap;
  background: none;
  outline: none;
  border: none;
  padding: 8px;
  flex: 1;
  transition: color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const DropArea = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 2;
  padding: 12px;

  &.visible {
    display: block;
  }
`

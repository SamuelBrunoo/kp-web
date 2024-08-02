import styled from "styled-components"

export const SelectArea = styled.div<{ $qt: number; $reverse: boolean }>`
  position: relative;
  overflow: visible;
  height: 48px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.blue.main};
  align-self: flex-end;
  min-width: 240px;

  ${({ $reverse }) =>
    $reverse
      ? ""
      : `
    &:has(.visible) {
      &::after {
        display: block;
      }
    }
  `}

  &::after {
    display: none;
    content: "";
    position: relative;
    background: transparent;
    width: 100%;
    bottom: -${({ $qt }) => ($qt <= 5 ? $qt * 36 : 5 * 36) + 8}px;
    height: 12px;
  }
`

export const DataArea = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  color: ${({ theme }) => theme.colors.black.main};
  cursor: pointer;
  flex: 1;
  transition: color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    transition: transform 0.3s;
    fill: ${({ theme }) => theme.colors.black.main};
    transform: rotate(0deg);
    width: 14px;
    height: 14px;
  }

  &.turnedIcon svg {
    transform: rotate(180deg);
  }
`

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
`

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.grey.main};
  white-space: nowrap;
  margin-left: 8px;
  transition: top 0.3s, font-size 0.3s, color 0.3s;
  font-weight: 300;
  font-size: 12px;
`

export const SelectedInfo = styled.span`
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  display: block;
  flex: 1;
`

export const OptionsArea = styled.div<{ $reverse: boolean }>`
  display: none;
  position: absolute;
  ${({ $reverse }) => ($reverse ? `bottom` : `top`)}: calc(100% + 6px);
  right: 0;
  left: 0px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 5;

  &.visible {
    display: block;
  }
`

export const Option = styled.div`
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.grey.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green.lighter};
    color: ${({ theme }) => theme.colors.black.main};
  }
`

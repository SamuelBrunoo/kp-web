import styled from "styled-components"

export const SelectArea = styled.div<{ $qt?: number; $reverse?: boolean }>`
  position: relative;
  overflow: visible;
  height: 100%;
  /* flex: 1; */
  align-self: stretch;
  min-width: 240px;
  max-width: 420px;

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
`

export const DataArea = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  color: ${({ theme }) => theme.colors.neutral[100]};
  cursor: pointer;
  flex: 1;
  transition: color 0.3s;

  svg {
    transition: transform 0.3s;
    fill: ${({ theme }) => theme.colors.neutral[100]};
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
  color: ${({ theme }) => theme.colors.neutral[500]};
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
  background-color: ${({ theme }) => theme.colors.neutral[900]};
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
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green[260]};
    color: ${({ theme }) => theme.colors.neutral[100]};
  }
`

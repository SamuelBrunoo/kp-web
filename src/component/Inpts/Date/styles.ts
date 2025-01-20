import styled from "styled-components"

export const DataArea = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  color: ${({ theme }) => theme.colors.neutral[100]};
  cursor: pointer;
  flex: 1;
  transition: color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    width: 14px;
    height: 14px;
  }
`

export const PickerArea = styled.div`
  position: absolute;
  width: 0;
  overflow: hidden;
  z-index: -1;
  top: 0;
`

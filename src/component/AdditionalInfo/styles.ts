import styled from "styled-components"

export const Box = styled.div<{ $size?: number }>`
  ${({ $size }) => $size && `grid-column: span ${$size};`}
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: fit-content;

  svg {
    width: 18px;
    height: 18px;
  }
`

export const InfoName = styled.span`
  color: ${({ theme }) => theme.colors.green.strong};
  font-weight: 500;
  font-size: 14px;
`

export const Value = styled.span`
  font-size: 14px;
  font-weight: 300;
  width: 100%;
`

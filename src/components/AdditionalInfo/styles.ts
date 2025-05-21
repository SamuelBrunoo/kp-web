import styled from "styled-components"
import { FormField } from "../../utils/@types/components/FormFields"

export const Box = styled.div<{
  $size?: number
  $gridSizes?: FormField["gridSizes"]
}>`
  ${({ $size, $gridSizes }) =>
    ($gridSizes?.big || $size) &&
    `grid-column: span ${$gridSizes?.big ?? $size};`}
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span
      ${({ $size, $gridSizes }) =>
        $gridSizes?.small ?? $gridSizes?.big ?? $size ?? "unset"};
    flex: unset;

    min-width: unset;
    max-width: unset;
    width: unset;
  }
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: fit-content;
  color: ${({ theme }) => theme.colors.orange[460]};

  svg {
    width: 18px;
    height: 18px;
  }
`

export const InfoName = styled.span`
  color: ${({ theme }) => theme.colors.green[360]};
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`

export const Value = styled.span`
  font-size: 14px;
  font-weight: 300;
  width: 100%;
  color: ${({ theme }) => theme.colors.neutral[300]};
`

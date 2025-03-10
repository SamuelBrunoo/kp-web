import styled from "styled-components"

export const Element = styled.div<{ $showing?: boolean }>`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.green[460]};

  svg {
    opacity: 0;
    opacity: ${({ $showing }) => ($showing ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

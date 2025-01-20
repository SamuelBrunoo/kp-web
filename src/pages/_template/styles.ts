import styled from "styled-components"

export const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[700]};
  display: flex;
  min-height: 100vh;
  gap: 32px;
  padding: 24px;
`

export const Wrapper = styled.div`
  flex: 1;
  min-height: 100%;
`

export const Container = styled.div`
  gap: 32px;
  flex: 1;
  min-height: inherit;
`

import styled from "styled-components"

export const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.green.main};
  display: flex;
  min-height: 100vh;
  gap: 36px;
  padding: 24px;
`

export const Wrapper = styled.div`
  flex: 1;
  min-height: 100%;
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white.main};
  padding: 24px;
  border-radius: 12px;
  flex: 1;
  min-height: inherit;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
`

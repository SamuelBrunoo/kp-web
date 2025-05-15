import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-width: max(100svw - 48px);
  }
`

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const HeaderTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  font-family: "Poppins";
  color: ${({ theme }) => theme.colors.green[260]};
`

export const SubTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange[360]};
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  flex-wrap: wrap;

  color: ${({ theme }) => theme.colors.neutral[500]};

  svg {
    width: 16px;
    height: 16px;
  }
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: ${({ theme }) => theme.colors.neutral[100]};
  font-size: 13px;
  font-weight: 400;
  padding: 4px;
  border-radius: 4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`

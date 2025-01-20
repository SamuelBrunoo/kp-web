import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  font-family: "Poppins";
  color: ${({ theme }) => theme.colors.green[260]};
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;

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

export const SubTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  flex: 1;
`

export const Button = styled.button<{ $role: "new" | "update" | "cancel" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  outline: none;
  background-color: ${({ $role, theme }) =>
    $role === "new"
      ? theme.colors.green[360]
      : $role === "cancel"
      ? theme.colors.orange[560]
      : theme.colors.green[360]};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[900]};

  svg {
    width: 16px;
    height: 16px;
  }
`

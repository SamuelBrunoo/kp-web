import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
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
  padding: 4px 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.green.lighter};
  align-self: stretch;

  color: ${({ theme }) => theme.colors.grey.main};

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
  color: ${({ theme }) => theme.colors.black.main};
  font-size: 13px;
  font-weight: 400;
  padding: 4px;
  border-radius: 4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey.main};
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
      ? theme.colors.green.strong
      : $role === "cancel"
      ? theme.colors.orange.main
      : theme.colors.green.strong};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white.main};

  svg {
    width: 16px;
    height: 16px;
  }
`

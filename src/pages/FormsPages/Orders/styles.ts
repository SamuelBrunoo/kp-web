import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const FormGroup = styled.div<{ $fullSize?: boolean }>`
  width: ${({ $fullSize }) => ($fullSize ? "100%" : "fit-content")};
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
`

export const GroupTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black.main};
`

export const FormLine = styled.div<{ $fullSize?: boolean }>`
  display: flex;
  gap: 16px;
  width: ${({ $fullSize }) => ($fullSize ? "100%" : "fit-content")};
`

export const Button = styled.button<{ $role: "add" | "include" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  outline: none;
  background-color: ${({ $role, theme }) =>
    $role === "add" ? theme.colors.green.strong : theme.colors.blue.main};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white.main};

  svg {
    width: 16px;
    height: 16px;
  }
`

// Order Resume

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
`

export const IGTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`

export const AdditionalInfosArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const AIRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 24px;
`

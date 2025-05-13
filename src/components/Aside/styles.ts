import styled from "styled-components"

export const Component = styled.div<{ $opened: boolean }>`
  padding: 10px;
  width: 100%;
  max-width: 280px;
  border-right: 1px solid ${({ theme }) => theme.colors.green[200]};
  background-color: ${({ theme }) => theme.colors.neutral[700]};
  position: sticky;
  top: 20px;

  min-height: calc(100svh - 112px - 40px - 20px - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.3s;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    position: fixed;
    z-index: 100;
    top: 16px;
    height: calc(100vh + 30px);
    min-height: calc(100svh);
    padding: 20px;
    margin-left: ${({ $opened }) => ($opened ? -24 : -304)}px;
    margin-top: -16px;
  }
`

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

export const BurguerWrapper = styled.div<{
  $opened: boolean
  $type?: "primary" | "secondary"
}>`
  position: absolute;
  top: ${({ $type }) => (!$type || $type === "primary" ? 12 : 64)}px;
  right: -12px;
  transform: translateX(
    ${({ $opened }) => ($opened ? "calc(50% - 12px)" : "calc(100% + 7px)")}
  );
  transition: transform 0.3s;
  background-color: ${({ theme, $type }) =>
    !$type || $type === "primary"
      ? theme.colors.neutral[800]
      : theme.colors.orange[460]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
  border-radius: 200px;
  padding: 8px;
  z-index: 2;
  display: none;
  place-items: center;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    display: grid;
  }
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 128px;
`

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 32px - 12px);
`

export const UserName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green[200]};
`

export const UserEmail = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.green[260]};
`

export const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

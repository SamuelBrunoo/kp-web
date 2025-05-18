import { useEffect, useRef, useState } from "react"
import * as S from "./styles"

import { TOPStatus } from "../../utils/@types/data/order"

const textRelation: { [key in TOPStatus]: string } = {
  queued: "Em fila",
  done: "Concluído",
  doing: "Em andamento",
  lor: "Falta material",
}

type Props = {
  status: TOPStatus
  onChange?: (newValue: TOPStatus) => void
  shouldHideOptions?: boolean
}

const StatusIndicator = ({ status, onChange, shouldHideOptions }: Props) => {
  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const collapseOwnDropdown = () => {
      setOpen(false)
    }

    const handleClickOutside = (e: any) => {
      if (e.target !== document.children[0]) {
        if (
          !dataRef.current?.contains(e.target) &&
          !dropRef.current?.contains(e.target) &&
          open
        )
          collapseOwnDropdown()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [dropRef, open])

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Box ref={dataRef} $status={status} onClick={() => setOpen(!open)}>
        <S.Text>{textRelation[status]}</S.Text>
      </S.Box>
      {!shouldHideOptions && (
        <S.Dropdown ref={dropRef} $opened={open}>
          {Object.entries(textRelation)
            .filter(([option]) => option !== status)
            .map(([option, value], index) => (
              <S.Option
                key={index}
                $status={option as TOPStatus}
                onClick={() => {
                  setOpen(false)
                  if (onChange) onChange(option as TOPStatus)
                }}
              >
                <span>{value}</span>
              </S.Option>
            ))}
        </S.Dropdown>
      )}
    </S.Wrapper>
  )
}

export default StatusIndicator

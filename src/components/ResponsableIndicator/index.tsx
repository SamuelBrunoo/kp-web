import { useEffect, useRef, useState } from "react"
import * as S from "./styles"

import { TOPStatus } from "../../utils/@types/data/order"
import { TRoOption } from "../../utils/@types/sys/roOptions"

type Props = {
  options: TRoOption[]
  value: string | null
  onChange?: (newValue: string) => void
}

const ResponsableIndicator = ({ options, value, onChange }: Props) => {
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
      <S.Box ref={dataRef} onClick={() => setOpen(!open)}>
        <S.Text>
          {options.find((o) => o.key === value)?.value ?? "Não atribuído"}
        </S.Text>
      </S.Box>
      <S.Dropdown ref={dropRef} $opened={open}>
        {options
          .filter(({ key }) => key !== value)
          .map(({ key, value: optionValue }, index) => (
            <S.Option
              key={index}
              onClick={() => {
                setOpen(false)
                if (onChange) onChange(key as TOPStatus)
              }}
            >
              <span>{optionValue}</span>
            </S.Option>
          ))}
      </S.Dropdown>
    </S.Wrapper>
  )
}

export default ResponsableIndicator

import React, { useEffect, useRef, useState } from "react"
import * as C from "../styles"
import * as S from "../stylesSelect"
import icons from "../../../assets/icons"
import { TRoOption } from "../../../utils/@types/sys/roOptions"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"

export type TInputSelect = {
  label?: string
  placeholder?: string
  field: string
  options: TOption[]
  value: string | null
  disabled?: boolean
  setByKey?: boolean
  elevation?: number
  reverse?: boolean
  fixedWidth?: number

  zIndex?: number

  error?: TFieldError
  avoidAutoSelect?: boolean
}

export type TOption = {
  key: string
  value: string
}

type Props = TInputSelect & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
  alignBottom?: boolean
  avoidValueShow?: boolean
}

const SelectDefault = ({
  field,
  label,
  value,
  options,
  onChange,
  setByKey,
  reverse,
  avoidAutoSelect,

  gridSizes,
  alignBottom,
  fixedWidth,
  zIndex,
  elevation,

  error,
  disabled,
}: Props) => {
  const [showing, setShowing] = useState(false)
  const [selected, setSelected] = useState<TRoOption | undefined>({
    key: "",
    value: "",
  })

  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setShowing(!showing)
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(field, picked.key)
    setShowing(false)
  }

  useEffect(() => {
    const v = options.find((o) => o.key === value)

    if (value) setSelected(v)
    else if (options.length === 0) {
      if (!avoidAutoSelect) setSelected(options[0])
    }
  }, [options, value, selected, options.length, avoidAutoSelect])

  useEffect(() => {
    const collapseOwnDropdown = () => {
      setShowing(false)
    }

    const handleClickOutside = (e: any) => {
      if (e.target !== document.children[0]) {
        if (
          !dataRef.current?.contains(e.target) &&
          !dropRef.current?.contains(e.target) &&
          showing
        )
          collapseOwnDropdown()
      }
    }

    if (showing) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [dropRef, showing])

  // Renders

  const renderText = () => {
    let text = ""

    if (setByKey) {
      if (selected) text = selected.key
    } else {
      if (selected) text = selected.value
    }

    return text
  }

  return (
    <C.Wrapper
      $gridSizes={gridSizes}
      $alignBottom={alignBottom}
      $fixedWidth={fixedWidth}
      $zIndex={zIndex}
    >
      <C.Area $elevation={elevation} $hasError={error?.has}>
        <S.SelectArea $disabled={disabled} ref={wrapperRef}>
          {label && <S.Label>{label}</S.Label>}
          <S.DataArea
            ref={dataRef}
            onClick={!disabled ? toggleDropdown : undefined}
            className={showing ? "turnedIcon" : ""}
            $disabled={disabled}
          >
            <S.Left>
              <S.SelectedInfo>{renderText()}</S.SelectedInfo>
            </S.Left>
            <icons.Dropdown />
          </S.DataArea>
          <S.OptionsArea
            ref={dropRef}
            className={showing ? "visible" : ""}
            $reverse={reverse ?? false}
          >
            {options.map((o, k) => (
              <S.Option key={k} onClick={() => handlePick(o)}>
                <span>{o.value}</span>
              </S.Option>
            ))}
          </S.OptionsArea>
        </S.SelectArea>
        <span>{error?.has ? error?.message : ""}</span>
      </C.Area>
    </C.Wrapper>
  )
}

export default SelectDefault

import React, { useEffect, useRef, useState } from "react"
import * as S from "../stylesSelect"
import icons from "../../../assets/icons"

type Props = {
  label?: string
  value: any
  roOptions: ReadonlyArray<{ key: string; value: string }>
  onChange: (v: any) => void
  setbykey?: boolean
  showValueFromKey?: boolean
  reverse?: boolean
  avoidAutoSelect?: boolean
}

const SelectDefault = ({
  label,
  value,
  roOptions,
  onChange,
  setbykey,
  showValueFromKey,
  reverse,
  avoidAutoSelect,
}: Props) => {
  const [showing, setShowing] = useState(false)
  const [selected, setSelected] = useState<any>({ value: "" })
  const [options, setOptions] = useState<any[]>([])

  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setShowing(!showing)
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(picked.key)
    setShowing(false)
  }

  useEffect(() => {
    setOptions([...roOptions])
    const v = roOptions.find((o) => o.key === value)

    if (!avoidAutoSelect) {
      if (value) setSelected(v)
      else if (options.length === 0) setSelected(roOptions[0])
    }
  }, [
    setOptions,
    setbykey,
    roOptions,
    value,
    selected,
    options.length,
    avoidAutoSelect,
  ])

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

  return (
    <S.SelectArea
      ref={wrapperRef}
      $qt={options.length}
      $reverse={reverse ?? false}
    >
      {label && <S.Label>{label}</S.Label>}
      <S.DataArea
        ref={dataRef}
        onClick={toggleDropdown}
        className={showing ? "turnedIcon" : ""}
      >
        <S.Left>
          <S.SelectedInfo>
            {showValueFromKey && setbykey
              ? selected.value
              : setbykey && selected.key
              ? (selected?.key as string).toUpperCase()
              : selected?.value}
          </S.SelectedInfo>
        </S.Left>
        {icons.dropdown}
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
  )
}

export default SelectDefault

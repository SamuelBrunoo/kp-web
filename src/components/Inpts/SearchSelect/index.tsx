import { useEffect, useRef, useState } from "react"
import * as SelectStyles from "../stylesSelect"
import * as S from "../styles"
import { TRoOption } from "../../../utils/@types/sys/roOptions"
import Icons from "../../../assets/icons"
import { theme } from "../../../theme"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TOption } from "../Select"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"

export type TInputSearchSelect = {
  field: string
  label?: string
  value: any
  disabled?: boolean
  isNumber?: boolean
  placeholder?: string

  options: TOption[]
  setbykey?: boolean
  showValueFromKey?: boolean
  reverse?: boolean

  setByKey?: boolean
  elevation?: number
  fixedWidth?: number

  zIndex?: number

  error?: TFieldError
  avoidAutoSelect?: boolean
}

type Props = TInputSearchSelect & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
  alignBottom?: boolean
  avoidValueShow?: boolean
}

const Input = ({
  field,
  label,
  value,
  onChange,
  disabled,
  error,
  placeholder,
  gridSizes,
  alignBottom,
  fixedWidth,
  zIndex,
  elevation,

  options,
  setbykey,
  avoidAutoSelect,
}: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const dropRef = useRef<null | HTMLDivElement>(null)

  const [showing, setShowing] = useState(false)
  const [search, setSearch] = useState("")
  const [showingOptions, setShowingOptions] = useState<TOption[]>([])

  const [selected, setSelected] = useState<TRoOption | undefined>({
    key: "",
    value: "",
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    inputRef.current?.focus()
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    setSearch(picked.value)
    onChange(field, picked.key)
    setShowing(false)
  }

  useEffect(() => {
    if (!!search) {
      const newList = options.filter((i) =>
        i.value.toLowerCase().includes(search.toLowerCase())
      )
      setShowingOptions(newList)
    } else setShowingOptions(options)
  }, [options, search])

  useEffect(() => {
    if (!selected?.key) setShowingOptions(options)

    const v = options.find((o) => o.key === value)

    if (value) handlePick(v)
    else if (options.length > 0) {
      if (!avoidAutoSelect) setSelected(options[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setbykey, options, value, selected, options.length, avoidAutoSelect])

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
    <S.Wrapper
      $gridSizes={gridSizes}
      $alignBottom={alignBottom}
      $fixedWidth={fixedWidth}
      $zIndex={zIndex}
    >
      <S.Area $elevation={elevation}>
        <S.InputArea $disabled={disabled} $hasError={error?.has ?? false}>
          <S.SelectedArea
            ref={dataRef}
            onClick={disabled ? undefined : handleClick}
            $hasError={error?.has ?? false}
          >
            <S.Left>
              <S.InpLine>
                <Icons.Search
                  style={{
                    top: 25,
                    left: 6,
                    position: "absolute",
                    width: 20,
                    height: 20,
                    color: theme.colors.green[460],
                  }}
                />

                <S.Label
                  $hasError={error?.has ?? false}
                  style={{
                    left: 34,
                  }}
                >
                  {label}
                </S.Label>
                <S.Input
                  ref={inputRef}
                  value={search}
                  onFocus={(e) =>
                    disabled ? e.currentTarget.blur() : setShowing(true)
                  }
                  onChange={
                    !disabled ? (e) => setSearch(e.target.value) : () => {}
                  }
                  $hasError={error?.has ?? false}
                  placeholder={placeholder}
                  style={{
                    paddingLeft: 36,
                  }}
                />
              </S.InpLine>
            </S.Left>
          </S.SelectedArea>
          <SelectStyles.OptionsArea
            ref={dropRef}
            className={showing ? "visible" : ""}
            $reverse={false}
          >
            {showingOptions.length > 0 ? (
              showingOptions.map((o, k) => (
                <SelectStyles.Option key={k} onClick={() => handlePick(o)}>
                  <span style={{ position: "unset", color: "currentcolor" }}>
                    {o.value}
                  </span>
                </SelectStyles.Option>
              ))
            ) : (
              <span
                style={{
                  color: theme.colors.neutral[300],
                }}
              >
                Nenhum resultado encontrado
              </span>
            )}
          </SelectStyles.OptionsArea>
        </S.InputArea>
        <span>{error?.has ? error?.message : ""}</span>
      </S.Area>
    </S.Wrapper>
  )
}

export default Input

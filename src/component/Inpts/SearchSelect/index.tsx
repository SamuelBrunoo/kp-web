import { useEffect, useRef, useState } from "react"
import * as SelectStyles from "../stylesSelect"
import * as S from "../styles"
import { TRoOption } from "../../../utils/@types/sys/roOptions"
import Icons from "../../../assets/icons"
import { theme } from "../../../theme"

type Props = {
  label: string
  value: any
  onChange: (v: any) => void
  disabled?: boolean
  isNumber?: boolean
  error?: {
    state: boolean
    message: string
  }
  placeholder?: string
  type?: "email" | "password"
  onEnter?: () => void

  roOptions: ReadonlyArray<{ key: string; value: string }>
  setbykey?: boolean
  showValueFromKey?: boolean
  reverse?: boolean
  avoidAutoSelect?: boolean
}

const Input = ({
  label,
  value,
  onChange,
  disabled,
  error,
  isNumber,
  placeholder,
  type,
  onEnter,

  roOptions,
  setbykey,
  showValueFromKey,
  reverse,
  avoidAutoSelect,
}: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const dropRef = useRef<null | HTMLDivElement>(null)

  const [showing, setShowing] = useState(false)

  const [options, setOptions] = useState<any[]>([])
  const [selected, setSelected] = useState<TRoOption | undefined>({
    key: "",
    value: "",
  })

  const handleClick = () => {
    inputRef.current?.focus()
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(picked.key)
    setShowing(false)
  }

  const handleValue = (v: string) => {
    if (v.length > 0) setShowing(true)
    onChange(v)
  }

  useEffect(() => {
    setOptions([...roOptions])
    const v = roOptions.find((o) => o.key === value)

    if (value) setSelected(v)
    else if (options.length === 0) {
      if (!avoidAutoSelect) setSelected(roOptions[0])
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

  return (
    <S.InputArea $disabled={disabled} $hasError={error?.state ?? false}>
      <S.SelectedArea
        onClick={disabled ? undefined : handleClick}
        $hasError={error?.state ?? false}
      >
        <S.Left onClick={disabled ? undefined : handleClick}>
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
              $hasError={error?.state ?? false}
              style={{
                left: 34,
              }}
            >
              {label}
            </S.Label>
            <S.Input
              ref={inputRef}
              value={value}
              onFocus={(e) => (disabled ? e.currentTarget.blur() : undefined)}
              onChange={
                !disabled ? (e) => handleValue(e.target.value) : () => {}
              }
              $hasError={error?.state ?? false}
              placeholder={placeholder}
              type={type === "password" ? "password" : "text"}
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
        {options.length > 0 ? (
          options.map((o, k) => (
            <SelectStyles.Option key={k} onClick={() => handlePick(o)}>
              <span style={{ position: "unset", color: "currentcolor" }}>{o.value}</span>
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
  )
}

export default Input

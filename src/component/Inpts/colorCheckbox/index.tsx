import icons from "../../../assets/icons"

type Props = {
  checked: boolean
  onChange: (v: any) => void
}

const ColorCheckbox = ({ checked, onChange }: Props) => {
  const handleClick = () => {
    onChange(!checked)
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: 32,
        height: 32,
        borderRadius: 4,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {checked && <icons.check />}
    </div>
  )
}

export default ColorCheckbox

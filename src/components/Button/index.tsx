import { Button as MuiButton } from "@mui/material"

type Props = {
  type: "primary" | "secondary" | "tertiary"
  color: "green" | "red" | "orange" | "blue"
  role?: "new" | "update" | "cancel"
  text?: string
  action: (p?: any) => void
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  loading?: boolean
  disabled?: boolean
}

const Button = (p: Props) => {
  return (
    <MuiButton
      disabled={p.disabled}
      loading={p.loading}
      startIcon={p.startIcon}
      endIcon={p.endIcon}
      variant={
        p.type === "primary"
          ? "contained"
          : p.type === "secondary"
          ? "text"
          : "outlined"
      }
      sx={{
        backgroundColor: (theme) =>
          p.type !== "primary"
            ? "transparent"
            : p.color === "blue"
            ? theme.palette.blue[600]
            : p.color === "green"
            ? theme.palette.green[460]
            : p.color === "orange"
            ? theme.palette.orange[460]
            : theme.palette.red[460],
        color: (theme) =>
          p.type === "primary"
            ? theme.palette.neutral[900]
            : p.color === "blue"
            ? theme.palette.blue[600]
            : p.color === "green"
            ? theme.palette.green[460]
            : p.color === "orange"
            ? theme.palette.orange[460]
            : theme.palette.red[460],
        fontWeight: 400,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      }}
      onClick={p.action}
    >
      {p.text && <span>{p.text}</span>}
    </MuiButton>
  )
}

export default Button

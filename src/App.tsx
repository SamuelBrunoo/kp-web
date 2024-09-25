import React from "react"
import { ThemeProvider } from "styled-components"
import Router from "./routes"
import { theme } from "./theme"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"

function App() {
  return (
    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App

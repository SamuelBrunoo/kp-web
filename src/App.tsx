import { useEffect } from "react"
import { theme } from "./theme"
import Router from "./routes"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"
import Feedback from "./components/Feedback"
import getStore from "./store"
import { ThemeProvider } from "styled-components"

import { ThemeProvider as MuiThemeProvider } from "@mui/material"
import { muiTheme } from "./theme/muiTheme"
import Modal from "./components/Modal"

function App() {
  const { controllers, feedback } = getStore()

  useEffect(() => {
    if (feedback.visible) {
      setTimeout(() => {
        controllers.feedback.fade()
        setTimeout(() => {
          controllers.feedback.clear()
        }, 500)
      }, 4000)
    }
  }, [feedback, controllers.feedback])

  return (
    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <Modal />
          <Feedback data={feedback} />
          <Router />
        </ThemeProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  )
}

export default App

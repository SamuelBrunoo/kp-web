import { ThemeProvider } from "styled-components"
import Router from "./routes"
import { theme } from "./theme"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"
import Feedback from "./component/Feedback"
import getStore from "./store"
import { useEffect } from "react"

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
      <ThemeProvider theme={theme}>
        <Feedback data={feedback} />
        <Router />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

// Fonts
import "@fontsource/mr-de-haviland"
import "@fontsource/inter"
import "@fontsource/lexend"
import "@fontsource/poppins"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

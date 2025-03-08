import { createTheme } from "@mui/material/styles"
import { TMultiToneColor } from "./theme"

declare module "@mui/material/styles" {
  interface Palette {
    neutral: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    green: TMultiToneColor
    orange: TMultiToneColor
    blue: TMultiToneColor
    red: TMultiToneColor
  }
  interface PaletteOptions {
    neutral?: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    green: TMultiToneColor
    orange: TMultiToneColor
    blue: TMultiToneColor
    red: TMultiToneColor
  }
}

const palleteNeutral = {
  100: "#191919",
  200: "#454545",
  300: "#6F6F6F",
  400: "#B9B9B9",
  500: "#C7C7C7",
  600: "#D3D3D3",
  700: "#E9E9E9",
  800: "#F5F5F5",
  900: "#FFFFFF",
}

const palleteGreen = {
  100: "rgba(13, 77, 37, 1)",
  130: "rgba(13, 77, 37, 0.3)",
  160: "rgba(13, 77, 37, 0.6)",
  200: "rgba(16, 91, 45, 1)",
  230: "rgba(16, 91, 45, 0.3)",
  260: "rgba(16, 91, 45, 0.6)",
  300: "rgba(18, 116, 55, 1)",
  330: "rgba(18, 116, 55, 0.3)",
  360: "rgba(18, 116, 55, 0.6)",
  400: "rgba(26, 146, 72, 1)",
  430: "rgba(26, 146, 72, 0.3)",
  460: "rgba(26, 146, 72, 0.6)",
  500: "rgba(32, 178, 88, 1)",
  530: "rgba(32, 178, 88, 0.3)",
  560: "rgba(32, 178, 88, 0.6)",
  600: "rgba(32, 207, 99, 1)",
  630: "rgba(32, 207, 99, 0.3)",
  660: "rgba(32, 207, 99, 0.6)",
}

const palleteOrange = {
  100: "rgba(174, 93, 0, 1)",
  130: "rgba(174, 93, 0, 0.3)",
  160: "rgba(174, 93, 0, 0.6)",
  200: "rgba(207, 111, 0, 1)",
  230: "rgba(207, 111, 0, 0.3)",
  260: "rgba(207, 111, 0, 0.6)",
  300: "rgba(221, 118, 0, 1)",
  330: "rgba(221, 118, 0, 0.3)",
  360: "rgba(221, 118, 0, 0.6)",
  400: "rgba(235, 125, 0, 1)",
  430: "rgba(235, 125, 0, 0.3)",
  460: "rgba(235, 125, 0, 0.6)",
  500: "rgba(255, 136, 0, 1)",
  530: "rgba(255, 136, 0, 0.3)",
  560: "rgba(255, 136, 0, 0.6)",
  600: "rgba(255, 154, 38, 1)",
  630: "rgba(255, 154, 38, 0.3)",
  660: "rgba(255, 154, 38, 0.6)",
}

const palleteBlue = {
  100: "rgba(24, 17, 91, 1)",
  130: "rgba(24, 17, 91, 0.3)",
  160: "rgba(24, 17, 91, 0.6)",
  200: "rgba(29, 21, 115, 1)",
  230: "rgba(29, 21, 115, 0.3)",
  260: "rgba(29, 21, 115, 0.6)",
  300: "rgba(30, 15, 183, 1)",
  330: "rgba(30, 15, 183, 0.3)",
  360: "rgba(30, 15, 183, 0.6)",
  400: "rgba(32, 21, 144, 1)",
  430: "rgba(32, 21, 144, 0.3)",
  460: "rgba(32, 21, 144, 0.6)",
  500: "rgba(35, 17, 217, 1)",
  530: "rgba(35, 17, 217, 0.3)",
  560: "rgba(35, 17, 217, 0.6)",
  600: "rgba(41, 20, 252, 1)",
  630: "rgba(41, 20, 252, 0.3)",
  660: "rgba(41, 20, 252, 0.6)",
}

const palleteRed = {
  100: "rgba(80, 0, 0, 1)",
  130: "rgba(80, 0, 0, 0.3)",
  160: "rgba(80, 0, 0, 0.6)",
  200: "rgba(113, 0, 0, 1)",
  230: "rgba(113, 0, 0, 0.3)",
  260: "rgba(113, 0, 0, 0.6)",
  300: "rgba(147, 6, 6, 1)",
  330: "rgba(147, 6, 6, 0.3)",
  360: "rgba(147, 6, 6, 0.6)",
  400: "rgba(195, 2, 2, 1)",
  430: "rgba(195, 2, 2, 0.3)",
  460: "rgba(195, 2, 2, 0.6)",
  500: "rgba(222, 1, 1, 1)",
  530: "rgba(222, 1, 1, 0.3)",
  560: "rgba(222, 1, 1, 0.6)",
  600: "rgba(255, 0, 0, 1)",
  630: "rgba(255, 0, 0, 0.3)",
  660: "rgba(255, 0, 0, 0.6)",
}

export const muiTheme = createTheme({
  palette: {
    neutral: palleteNeutral,
    green: palleteGreen,
    orange: palleteOrange,
    blue: palleteBlue,
    red: palleteRed,
  },
})

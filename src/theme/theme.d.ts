import "./styled-components"

type TMultiToneColor = {
  100: string
  130: string
  160: string
  200: string
  230: string
  260: string
  300: string
  330: string
  360: string
  400: string
  430: string
  460: string
  500: string
  530: string
  560: string
  600: string
  630: string
  660: string
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
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
    bp: {
      large: number
      medium: number
      small: number
      xsmall: number
    }
    animations: {
      types: {
        fade: string
        fadeTop: string
        fadeRight: string
        fadeBottom: string
        fadeLeft: string
      }
      durations: {
        main: string
        slow: string
        fast: string
      }
      delays: {
        main: (x?: number) => string
        slow: (x?: number) => string
        slower: (x?: number) => string
      }
    }
  }
}

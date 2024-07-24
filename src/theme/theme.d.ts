import "./styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: {
        main: string
      }
      grey: {
        main: string
      }
      blue: {
        darker: string
        main: string
      }
      green: {
        main: string
        light: string
        lighter: string
        strong: string
      }
      orange: {
        main: string
      }
      red: {
        main: string
      }
      white: {
        main: string
        secondary: string
      }
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

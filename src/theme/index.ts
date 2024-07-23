import { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    black: {
      main: "#232323",
    },
    blue: {
      main: "",
      darker: "",
    },
    green: {
      main: "#D1EBD4",
      light: "#ACE3B2",
      lighter: "#F3FFF4",
    },
    orange: {
      main: "orange",
    },
    white: {
      main: "#FFFFFF",
      secondary: "",
    },
  },
  bp: {
    large: 1240,
    medium: 920,
    small: 520,
    xsmall: 320,
  },
  animations: {
    types: {
      fade: "animation: fade; animation-fill-mode: forwards;",
      fadeTop: "animation: fadeTop; animation-fill-mode: forwards;",
      fadeRight: "animation: fadeRight; animation-fill-mode: forwards;",
      fadeBottom: "animation: fadeBottom; animation-fill-mode: forwards;",
      fadeLeft: "animation: fadeLeft; animation-fill-mode: forwards;",
    },
    durations: {
      main: `animation-duration: 0.4s;`,
      slow: `animation-duration: 0.6s;`,
      fast: `animation-duration: 0.2s;`,
    },
    delays: {
      main: (x = 1) => `animation-delay: calc( ${x} * 0.2s);`,
      slow: (x = 1) => `animation-delay: calc( ${x} * 0.4s);`,
      slower: (x = 1) => `animation-delay: calc( ${x} * 0.6s);`,
    },
  },
}

import { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    black: {
      main: "#232323",
    },
    grey: {
      main: "#AFAFAF",
    },
    blue: {
      main: "",
      darker: "",
      pastel: "#6573F2",
    },
    green: {
      main: "#D1EBD4",
      light: "#ACE3B2",
      lighter: "#E8F9E9",
      strong: "#31E521",
    },
    orange: {
      main: "#FABB1B",
      pastel: "rgba(250, 187, 27, 0.3)",
    },
    red: {
      main: "#F92525",
      pastel: "rgba(255, 153, 153, 0.3)",
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

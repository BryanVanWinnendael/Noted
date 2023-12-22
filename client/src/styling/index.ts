import { HeaderColors, Theme } from "types"

export const THEME_DARK_GRAY = {
  backgroundColor: "#1B1B1D",
  backgroundColorHover: "#2C2C2E",
  secondaryBackgroundColor: "#2C2C2E",
  secondaryBackgroundColorHover: "#3A3A3C",
  textColor: "#fff",
  textColorMuted: "#8E8E93",
  iconColor: "#fff",
  accentColor: "#6488ea",
}

const DEFAULT_CUSTOM_HEADERS_DARK = {
  h1: "#6488ea",
  h2: "#CCCCFF",
  h3: "#2AAA8A",
  h4: "#FFFF8F",
  h5: "#FF5F1F",
  h6: "#D22B2B",
}

const DEFAULT_CUSTOM_HEADERS_LIGHT = {
  h1: "#6488ea",
  h2: "#CF9FFF",
  h3: "#2AAA8A",
  h4: "#FDDA0D",
  h5: "#FF5F1F",
  h6: "#D22B2B",
}

export const getStyle = () => {
  const theme = localStorage.getItem("theme")
  const themString = localStorage.getItem("customTheme")
  const customThemes = localStorage.getItem("customThemes")

  console.log(themString)


  if (theme && customThemes && Object.keys(JSON.parse(customThemes)).includes(theme)) {
    const themes = JSON.parse(customThemes)
    return themes[theme] as Theme
  }
  
  let themeObject: Theme | undefined
  if (themString && themString !== "undefined") {
    const cleanJsonString = themString.replace(/\r\n/g, '')
    themeObject = JSON.parse(cleanJsonString)
  }

  switch (theme) {
    case "darkGray":
      return THEME_DARK_GRAY
    case "customTheme":
      if (themeObject) return themeObject
      else return THEME_DARK_GRAY
  }
}

export const getHeaderColors = () => {
  const theme = localStorage.getItem("theme")

  const default_colors = theme === "dark" || theme === "darkGray" ? DEFAULT_CUSTOM_HEADERS_DARK : DEFAULT_CUSTOM_HEADERS_LIGHT

  const colors = localStorage.getItem("headerColors") || JSON.stringify(default_colors)
  const colorsEnabled = localStorage.getItem("customHeadersEnabled")
  
  if (colors && colorsEnabled === "true") {
    const headersObject = JSON.parse(colors)
    return headersObject as HeaderColors
  } else return false
}

export const resetHeaders = () => {
  const theme = localStorage.getItem("theme")
  const default_colors = theme === "dark" || theme === "darkGray" ? DEFAULT_CUSTOM_HEADERS_DARK : DEFAULT_CUSTOM_HEADERS_LIGHT
  localStorage.setItem("headerColors", JSON.stringify(default_colors))
  return default_colors
}
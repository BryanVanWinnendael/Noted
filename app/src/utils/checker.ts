import { Settings } from "types"
import { darken } from "polished"
import {
  DEFAULT_ACTIVE_THEME,
  DEFAULT_COMPACT_MODE,
  DEFAULT_EXTENSION_LABEL,
  DEFAULT_FONT,
  DEFAULT_GLASS,
  DEFAULT_GLASS_ENABLED,
  DEFAULT_HEADER_COLORS,
  DEFAULT_HEADER_COLORS_ENABLED,
  DEFAULT_TRANSLATE_LANGUAGE,
  DEFAULT_UPDATE,
  REQUIRED_SETTINGS_KEYS,
} from "./constants"

import languages from "./languages.json"

const headerKeys = ["h1", "h2", "h3", "h4", "h5", "h6"]
const glassKeys = ["navBar", "settings", "widgets", "window"]

const isColor = (key: any, color: any): any => {
  try {
    if (typeof key !== "string" || !headerKeys.includes(key)) {
      return false
    }
    darken("0.1", color)
    return true
  } catch {
    return false
  }
}

const isGlassBackground = (key: any, bool: any): any => {
  if (typeof key !== "string" || !glassKeys.includes(key)) {
    return DEFAULT_GLASS_ENABLED
  }
  if (typeof bool !== "boolean") {
    return DEFAULT_GLASS_ENABLED
  }
  return bool
}

const update = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_UPDATE
  }
  return bool
}

const headerColors = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_HEADER_COLORS
  }
  if (Object.keys(obj).every((key) => isColor(key, obj[key]))) {
    return obj
  }
  return DEFAULT_HEADER_COLORS
}

const headerColorsEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_HEADER_COLORS_ENABLED
  }
  return bool
}

const glassBackground = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_GLASS
  }
  const key_array = Object.keys(obj)
  let allGlassBackground = true
  key_array.forEach((val) => {
    if (!isGlassBackground(val, obj[val])) {
      allGlassBackground = false
    }
  })
  if (allGlassBackground) {
    return obj
  }
  return DEFAULT_GLASS
}

const glassEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_GLASS_ENABLED
  }
  return bool
}

const compactMode = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_COMPACT_MODE
  }
  return bool
}

const isCustomThemeString = (theme: any): any => {
  if (typeof theme !== "string") {
    return DEFAULT_ACTIVE_THEME
  }
  return theme
}

const isFontFamily = (font: any): any => {
  if (typeof font !== "string") {
    return DEFAULT_FONT
  }
  return font
}

const checkLanguage = (lang: any): any => {
  const langArray = Object.keys(languages.translation)
  if (langArray.includes(lang)) {
    return lang
  }
  return DEFAULT_TRANSLATE_LANGUAGE
}

const checkExtensionLabel = (label: any): any => {
  if (typeof label !== "boolean") {
    return DEFAULT_EXTENSION_LABEL
  }
  return label
}

export const ensureKeys = (settings: { [key in any]: any }, keys: any[]) => {
  const filteredObject = Object.fromEntries(
    Object.entries(settings).filter(([key]) => keys.includes(key as Settings)),
  )

  for (const key of keys) {
    if (filteredObject[key] === undefined) {
      filteredObject[key] = null
    }
  }
  return filteredObject
}

const settingsChecker = (settings: { [key in Settings]: any }): {
  [key in Settings]: any
} => {
  const filledSettings = ensureKeys(settings, REQUIRED_SETTINGS_KEYS)
  for (const [key, value] of Object.entries(filledSettings)) {
    switch (key) {
      case "check_updates":
        filledSettings[key] = update(value)
        break
      case "header_colors":
        filledSettings[key] = headerColors(value)
        break
      case "header_colors_enabled":
        filledSettings[key] = headerColorsEnabled(value)
        break
      case "glass_background":
        filledSettings[key] = glassBackground(value)
        break
      case "glass_background_enabled":
        filledSettings[key] = glassEnabled(value)
        break
      case "compact_mode":
        filledSettings[key] = compactMode(value)
        break
      case "active_theme":
        filledSettings[key] = isCustomThemeString(value)
        break
      case "font_family":
        filledSettings[key] = isFontFamily(value)
        break
      case "translate_language":
        filledSettings[key] = checkLanguage(value)
        break
      case "extension_label":
        filledSettings[key] = checkExtensionLabel(value)
        break
      default:
        break
    }
  }
  return filledSettings as { [key in Settings]: any }
}

export const checker = {
  settingsChecker,
}

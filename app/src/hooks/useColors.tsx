import { lighten } from "polished"
import darken from "polished/lib/color/darken"
import { utils } from "utils"
import { THEME_DARK, THEME_DEEP_BLUE, THEME_LIGHT } from "utils/constants"

const useColors = () => {
  const getBackgroundColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode")
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.backgroundColor
      case "dark":
        return THEME_DARK.backgroundColor
      case "deep_blue":
        return THEME_DEEP_BLUE.backgroundColor
      case "custom_theme":
        const custom_theme_json = localStorage.getItem("custom-theme-json")
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json)
          return theme.backgroundColor
        }
        return THEME_LIGHT.backgroundColor
      default:
        const custom_theme = localStorage.getItem("theme-json")
        if (custom_theme) {
          const theme = JSON.parse(custom_theme)
          return theme.backgroundColor
        }
        return THEME_LIGHT.backgroundColor
    }
  }

  const getSecondaryBackgroundColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode")
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.secondaryBackgroundColor
      case "dark":
        return THEME_DARK.secondaryBackgroundColor
      case "deep_blue":
        return THEME_DEEP_BLUE.secondaryBackgroundColor
      case "custom_theme":
        const custom_theme_json = localStorage.getItem("custom-theme-json")
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json)
          return theme.secondaryBackgroundColor
        }
        return THEME_LIGHT.secondaryBackgroundColor
      default:
        const custom_theme = localStorage.getItem("theme-json")
        if (custom_theme) {
          const theme = JSON.parse(custom_theme)
          return theme.secondaryBackgroundColor
        }
        return THEME_LIGHT.secondaryBackgroundColor
    }
  }

  const getTextColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode")
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.textColor
      case "dark":
        return THEME_DARK.textColor
      case "deep_blue":
        return THEME_DEEP_BLUE.textColor
      case "custom_theme":
        const custom_theme_json = localStorage.getItem("custom-theme-json")
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json)
          return theme.textColor
        }
        return THEME_LIGHT.textColor
      default:
        const custom_theme = localStorage.getItem("theme-json")
        if (custom_theme) {
          const theme = JSON.parse(custom_theme)
          return theme.textColor
        }
        return THEME_LIGHT.textColor
    }
  }

  const getIconColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode")
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.iconColor
      case "dark":
        return THEME_DARK.iconColor
      case "deep_blue":
        return THEME_DEEP_BLUE.iconColor
      case "custom_theme":
        const custom_theme_json = localStorage.getItem("custom-theme-json")
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json)
          return theme.iconColor
        }
        return THEME_LIGHT.iconColor
      default:
        const custom_theme = localStorage.getItem("theme-json")
        if (custom_theme) {
          const theme = JSON.parse(custom_theme)
          return theme.iconColor
        }
        return THEME_LIGHT.iconColor
    }
  }

  const getAccentColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode")
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.accentColor
      case "dark":
        return THEME_DARK.accentColor
      case "deep_blue":
        return THEME_DEEP_BLUE.accentColor
      case "custom_theme":
        const custom_theme_json = localStorage.getItem("custom-theme-json")
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json)
          return theme.accentColor
        }
        return THEME_LIGHT.accentColor
      default:
        const custom_theme = localStorage.getItem("theme-json")
        if (custom_theme) {
          const theme = JSON.parse(custom_theme)
          return theme.accentColor
        }
        return THEME_LIGHT.accentColor
    }
  }

  const getMutedTextColor = () => {
    const bg_color = getBackgroundColor()
    try {
      return getTextColor() === "#fff"
        ? darken("0.2", utils.getTextColor(bg_color))
        : lighten("0.4", utils.getTextColor(bg_color))
    } catch {
      return "#000"
    }
  }

  const geTextColorFromBackgroundColor = (bg_color?: string | undefined) => {
    if (!bg_color) {
      const bg_color = getBackgroundColor()
      return utils.getTextColor(bg_color)
    } else {
      return utils.getTextColor(bg_color)
    }
  }

  const getBackgroundColorLighter = () => {
    const bg_color = getBackgroundColor()
    return utils.getLighterColor("0.02", bg_color)
  }

  const getSecondaryBackgroundColorLighter = () => {
    const secondary_background_color = getSecondaryBackgroundColor()
    return utils.getLighterColor("0.02", secondary_background_color)
  }

  const getBorderColor = () => {
    const muted_color = getMutedTextColor()
    return utils.getTransparent(0.2, muted_color)
  }

  return {
    getBackgroundColor,
    getSecondaryBackgroundColor,
    getTextColor,
    getIconColor,
    getAccentColor,
    getBorderColor,
    getMutedTextColor,
    geTextColorFromBackgroundColor,
    getBackgroundColorLighter,
    getSecondaryBackgroundColorLighter,
  }
}

export default useColors

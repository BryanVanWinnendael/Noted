import { lighten } from "polished";
import darken from "polished/lib/color/darken";
import { utils } from "utils";
import { THEME_DARK, THEME_DEEP_BLUE, THEME_LIGHT } from "utils/constants";

const useColors = () => {
  const getBackgroundColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode");
    let custom_theme_json;
    let custom_theme;
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.backgroundColor;
      case "dark":
        return THEME_DARK.backgroundColor;
      case "deep_blue":
        return THEME_DEEP_BLUE.backgroundColor;
      case "custom_theme":
        custom_theme_json = localStorage.getItem("custom-theme-json");
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json);
          return theme.backgroundColor;
        }
        return THEME_LIGHT.backgroundColor;
      default:
        custom_theme = localStorage.getItem("theme-json");
        if (custom_theme) {
          const theme = JSON.parse(custom_theme);
          return theme.backgroundColor;
        }
        return THEME_LIGHT.backgroundColor;
    }
  };

  const getSecondaryBackgroundColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode");
    let custom_theme_json;
    let custom_theme;
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.secondaryBackgroundColor;
      case "dark":
        return THEME_DARK.secondaryBackgroundColor;
      case "deep_blue":
        return THEME_DEEP_BLUE.secondaryBackgroundColor;
      case "custom_theme":
        custom_theme_json = localStorage.getItem("custom-theme-json");
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json);
          return theme.secondaryBackgroundColor;
        }
        return THEME_LIGHT.secondaryBackgroundColor;
      default:
        custom_theme = localStorage.getItem("theme-json");
        if (custom_theme) {
          const theme = JSON.parse(custom_theme);
          return theme.secondaryBackgroundColor;
        }
        return THEME_LIGHT.secondaryBackgroundColor;
    }
  };

  const getTextColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode");
    let custom_theme_json;
    let custom_theme;
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.textColor;
      case "dark":
        return THEME_DARK.textColor;
      case "deep_blue":
        return THEME_DEEP_BLUE.textColor;
      case "custom_theme":
        custom_theme_json = localStorage.getItem("custom-theme-json");
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json);
          return theme.textColor;
        }
        return THEME_LIGHT.textColor;
      default:
        custom_theme = localStorage.getItem("theme-json");
        if (custom_theme) {
          const theme = JSON.parse(custom_theme);
          return theme.textColor;
        }
        return THEME_LIGHT.textColor;
    }
  };

  const getIconColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode");
    let custom_theme_json;
    let custom_theme;
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.iconColor;
      case "dark":
        return THEME_DARK.iconColor;
      case "deep_blue":
        return THEME_DEEP_BLUE.iconColor;
      case "custom_theme":
        custom_theme_json = localStorage.getItem("custom-theme-json");
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json);
          return theme.iconColor;
        }
        return THEME_LIGHT.iconColor;
      default:
        custom_theme = localStorage.getItem("theme-json");
        if (custom_theme) {
          const theme = JSON.parse(custom_theme);
          return theme.iconColor;
        }
        return THEME_LIGHT.iconColor;
    }
  };

  const getAccentColor = () => {
    const active_theme = localStorage.getItem("chakra-ui-color-mode");
    let custom_theme_json;
    let custom_theme;
    switch (active_theme) {
      case "light":
        return THEME_LIGHT.accentColor;
      case "dark":
        return THEME_DARK.accentColor;
      case "deep_blue":
        return THEME_DEEP_BLUE.accentColor;
      case "custom_theme":
        custom_theme_json = localStorage.getItem("custom-theme-json");
        if (custom_theme_json) {
          const theme = JSON.parse(custom_theme_json);
          return theme.accentColor;
        }
        return THEME_LIGHT.accentColor;
      default:
        custom_theme = localStorage.getItem("theme-json");
        if (custom_theme) {
          const theme = JSON.parse(custom_theme);
          return theme.accentColor;
        }
        return THEME_LIGHT.accentColor;
    }
  };

  const getMutedTextColor = () => {
    const bg_color = getBackgroundColor();
    try {
      return getTextColor() === "#fff"
        ? darken("0.2", utils.getTextColor(bg_color))
        : lighten("0.4", utils.getTextColor(bg_color));
    } catch {
      return "#000";
    }
  };

  const getBackgroundColorLighter = () => {
    const bg_color = getBackgroundColor();
    return utils.getLighterColor("0.02", bg_color);
  };

  const getSecondaryBackgroundColorLighter = () => {
    const secondary_background_color = getSecondaryBackgroundColor();
    return utils.getLighterColor("0.02", secondary_background_color);
  };

  const getSecondaryBackgroundColorDarker = () => {
    const secondary_background_color = getSecondaryBackgroundColor();
    return utils.getDarkerColor("0.02", secondary_background_color);
  };

  const getBackgroundColorDarker = () => {
    const bg_color = getBackgroundColor();
    return utils.getDarkerColor("0.02", bg_color);
  };

  const getBorderColor = () => {
    const muted_color = getMutedTextColor();
    return utils.getTransparent(0.2, muted_color);
  };

  const getTextColorOnAccentCollor = () => {
    return utils.getDarkerColor("0.1", getAccentColor());
  };

  const getGlassBackground = (color: string) => {
    return utils.getGlassBackground(color);
  };

  const getTransparent = (opacity: number, color: string) => {
    return utils.getTransparent(opacity, color);
  };

  return {
    backgroundColor: getBackgroundColor(),
    backgroundColorLighter: getBackgroundColorLighter(),
    backgroundColorDarker: getBackgroundColorDarker(),
    secondaryBackgroundColor: getSecondaryBackgroundColor(),
    secondaryBackgroundColorLighter: getSecondaryBackgroundColorLighter(),
    secondaryBackgroundColorDarker: getSecondaryBackgroundColorDarker(),
    textColor: getTextColor(),
    iconColor: getIconColor(),
    accentColor: getAccentColor(),
    borderColor: getBorderColor(),
    mutedTextColor: getMutedTextColor(),
    textAccentColor: getTextColorOnAccentCollor(),
    getGlassBackground,
    getTransparent,
  };
};

export default useColors;

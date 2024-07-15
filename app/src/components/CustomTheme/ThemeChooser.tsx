import { useColorMode, Select } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";

const ThemeChooser = () => {
  const { secondaryBackgroundColorLighter } = useColors();
  const { setColorMode, colorMode } = useColorMode();
  const { customThemes, saveSettings } = useSettings();

  const changeTheme = (e: any) => {
    const theme = e.target.value || "light";
    setColorMode(theme);
    saveSettings("active_theme", theme);
    if (customThemes && customThemes[theme])
      localStorage.setItem("theme-json", JSON.stringify(customThemes[theme]));
  };

  return (
    <Select
      value={colorMode}
      width="auto"
      css={{
        "& > *": {
          background: `${secondaryBackgroundColorLighter} !important`,
        },
      }}
      onChange={changeTheme}
      placeholder="Light"
      h="30px"
    >
      <option value="dark">Dark</option>
      <option value="deep_blue">Deep blue</option>
      {customThemes &&
        Object.keys(customThemes).map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      <option value="custom_theme">Custom</option>
    </Select>
  );
};

export default ThemeChooser;

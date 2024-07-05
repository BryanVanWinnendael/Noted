import { Box, Flex, Select, Text, useColorMode } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { utils } from "utils";
import CustomColors from "components/Custom-Theme/CustomColors";
import useColors from "hooks/useColors";

const Index = () => {
  const { getSecondaryBackgroundColor, getMutedTextColor } = useColors();
  const { setColorMode, colorMode } = useColorMode();
  const { customThemes, saveSettings } = useSettings();

  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);
  const muted_text_color = getMutedTextColor();

  const changeTheme = (e: any) => {
    const theme = e.target.value || "light";
    setColorMode(theme);
    saveSettings("active_theme", theme);
    if (customThemes && customThemes[theme])
      localStorage.setItem("theme-json", JSON.stringify(customThemes[theme]));
  };

  return (
    <Box p={2}>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mb={4}>
        <Box>
          <Text fontWeight="semibold">Base color scheme</Text>
          <Text color={muted_text_color}>Choose default color scheme</Text>
        </Box>
        <Select
          value={colorMode}
          width="auto"
          css={{ "& > *": { background: `${bg_color} !important` } }}
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
      </Flex>
      {String(colorMode) === "custom_theme" && <CustomColors />}
    </Box>
  );
};

export default Index;

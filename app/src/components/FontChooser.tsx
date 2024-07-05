import { DEFAULT_FONT, DEFAULT_FONTS } from "utils/constants";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { utils } from "utils";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";

const FontChooser = () => {
  const { getSecondaryBackgroundColor, getMutedTextColor } = useColors();
  const [font, setFont] = useState<string>(DEFAULT_FONT);
  const { fontFamily, saveSettings } = useSettings();

  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);
  const muted_text_color = getMutedTextColor();

  const changeFont = (e: any) => {
    const chosenFont = e.target.value || DEFAULT_FONT;
    setFont(chosenFont);
    saveSettings("font_family", chosenFont);
  };

  useEffect(() => {
    if (fontFamily) setFont(fontFamily);
  }, [fontFamily]);

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Font</Text>
        <Text color={muted_text_color}>Choose the font for the app</Text>
      </Box>
      <Select
        onChange={changeFont}
        maxH="200px"
        value={font}
        width="auto"
        css={{ "& > *": { background: `${bg_color} !important` } }}
        placeholder={DEFAULT_FONT + " (default)"}
        h="30px"
      >
        {DEFAULT_FONTS &&
          DEFAULT_FONTS.map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
      </Select>
    </Flex>
  );
};

export default FontChooser;

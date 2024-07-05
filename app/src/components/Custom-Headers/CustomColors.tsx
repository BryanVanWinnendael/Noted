import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { utils } from "utils";
import { useEffect, useState } from "react";
import { HeaderColors } from "types";
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";
import { DEFAULT_HEADER_COLORS } from "utils/constants";

const CustomColors = () => {
  const { getAccentColor, getMutedTextColor } = useColors();
  const { saveSettings, headerColors } = useSettings();
  const [colors, setColors] = useState<HeaderColors | false>(false);

  const accent_color = getAccentColor();
  const muted_text_color = getMutedTextColor();

  const onChange = (key: keyof HeaderColors, color: string) => {
    if (!colors) return;
    const newColors: HeaderColors = { ...colors };
    newColors[key] = color;
    setColors(newColors);
    saveSettings("header_colors", newColors);
  };

  const reset = () => {
    if (!colors) return;
    setColors(DEFAULT_HEADER_COLORS);
    saveSettings("header_colors", DEFAULT_HEADER_COLORS);
  };

  useEffect(() => {
    setColors(headerColors);
  }, [headerColors]);

  return (
    <Box>
      <Text mt={4} mb={2} fontSize="xl">
        Customize headers
      </Text>
      {colors && (
        <Box>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H1:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h1"
                onChange={onChange}
                givenColor={colors.h1}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H2:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h2"
                onChange={onChange}
                givenColor={colors.h2}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H3:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h3"
                onChange={onChange}
                givenColor={colors.h3}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H4:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h4"
                onChange={onChange}
                givenColor={colors.h4}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H5:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h5"
                onChange={onChange}
                givenColor={colors.h5}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={muted_text_color}>
              H6:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="h6"
                onChange={onChange}
                givenColor={colors.h6}
              />
            </Box>
          </Flex>
          <Button
            mt={2}
            color={utils.getTextColor(accent_color)}
            onClick={reset}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
          >
            Reset colors
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CustomColors;

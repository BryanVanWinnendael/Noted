import {
  Box,
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";

const WallpaperBrightness = () => {
  const { saveSettings, wallpaperBrightness } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();

  const brightnessValue = wallpaperBrightness * 100;

  const handleChange = (value: number) => {
    const brightness = value / 100;
    saveSettings("wallpaper_brightness", brightness);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Brightness</Text>
        <Text color={mutedTextColor}>
          Choose the brightness for the background
        </Text>
      </Box>

      <Flex w="50%" gap={4} alignItems="center">
        <Slider
          value={brightnessValue}
          aria-label="slider-ex-1"
          defaultValue={36}
          onChange={(val) => handleChange(val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button
          color={textColor}
          _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
          h={8}
          bg={accentColor}
          onClick={() => handleChange(100)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default WallpaperBrightness;

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
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";

const BlurChooser = () => {
  const { saveSettings, blur } = useSettings();
  const { mutedTextColor, accentColor, textColor } = useColors();

  const blurValue = blur * 10;

  const handleChange = (value: number) => {
    const blur = value / 10;
    saveSettings("blur", blur);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Blur</Text>
        <Text color={mutedTextColor}>Choose the blur for the background</Text>
      </Box>

      <Flex w="50%" gap={2} alignItems="center">
        <Slider
          value={blurValue}
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
          onClick={() => handleChange(0)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default BlurChooser;

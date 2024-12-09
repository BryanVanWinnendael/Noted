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

const Opacity = () => {
  const { saveSettings, scrollbar } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();

  const opacity = scrollbar.opacity;
  const opacityValue = opacity * 100;

  const handleChange = (value: number) => {
    const newOpacity = value / 100;
    const newScrollbar = { ...scrollbar, opacity: newOpacity };
    saveSettings("scrollbar", newScrollbar);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Opacity</Text>
        <Text color={mutedTextColor}>Choose the opacity for the scrollbar</Text>
      </Box>

      <Flex w="50%" gap={2} alignItems="center">
        <Slider
          value={opacityValue}
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
          onClick={() => handleChange(50)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default Opacity;

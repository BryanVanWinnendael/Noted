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

const SidebarOpacity = () => {
  const { saveSettings, sidebarOpacity } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();

  const opacityValue = sidebarOpacity * 100;

  const handleChange = (value: number) => {
    const opacity = value / 100;
    saveSettings("sidebar_opacity", opacity);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Sidebar opacity</Text>
        <Text color={mutedTextColor}>Choose the opacity for the sidebar</Text>
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
          onClick={() => handleChange(0)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default SidebarOpacity;

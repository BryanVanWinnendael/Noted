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

const ActionbarOpacity = () => {
  const { saveSettings, actionbarOpacity } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();

  const opacityValue = actionbarOpacity * 100;

  const handleChange = (value: number) => {
    const opacity = value / 100;
    saveSettings("action_bar_opacity", opacity);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Actionbar pacity</Text>
        <Text color={mutedTextColor}>Choose the opacity for the actiobar</Text>
      </Box>

      <Flex w="50%" gap={4} alignItems="center">
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
          onClick={() => handleChange(80)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default ActionbarOpacity;

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import { DEFAULT_SCROLLBAR } from "utils/constants";

const Color = () => {
  const { saveSettings, scrollbar } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();
  const color = scrollbar.color;

  const handleChange = (_: any, color: string) => {
    const newScrollbar = { ...scrollbar, color: color };
    saveSettings("scrollbar", newScrollbar);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box w="full">
        <Text fontWeight="semibold">Color</Text>
        <Text color={mutedTextColor}>Choose the color for the scrollbar</Text>
      </Box>

      <Flex w="full" justifyContent="flex-end">
        <Flex gap={2} alignItems="center">
          <ColorPicker
            keyType="scrollbar"
            onChange={handleChange}
            givenColor={color}
          />
          <Button
            color={textColor}
            _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
            h={8}
            bg={accentColor}
            onClick={() => handleChange("", DEFAULT_SCROLLBAR.color)}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Color;

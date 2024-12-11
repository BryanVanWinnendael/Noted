import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import ColorPicker from "./ColorPicker";

const SidebarTextColor = () => {
  const { saveSettings, sidebarTextColor } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();
  const color = sidebarTextColor ? sidebarTextColor : textColor;

  const handleChange = (_: any, color: string) => {
    saveSettings("sidebar_text_color", color);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Sidebar text color</Text>
        <Text color={mutedTextColor}>
          Choose the text color for the sidebar
        </Text>
      </Box>

      <Flex gap={2} alignItems="center">
        <ColorPicker
          keyType="sidebar_text_color"
          onChange={handleChange}
          givenColor={color}
        />
        <Button
          color={textColor}
          _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
          h={8}
          bg={accentColor}
          onClick={() => handleChange("", textColor)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default SidebarTextColor;

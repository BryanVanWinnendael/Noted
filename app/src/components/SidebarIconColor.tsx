import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import ColorPicker from "./ColorPicker";

const SidebarIconColor = () => {
  const { saveSettings, sidebarIconColor } = useSettingsStore();
  const { mutedTextColor, accentColor, textColor } = useColors();
  const color = sidebarIconColor ? sidebarIconColor : textColor;

  const handleChange = (_: any, color: string) => {
    saveSettings("sidebar_icon_color", color);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Sidebar icon color</Text>
        <Text color={mutedTextColor}>
          Choose the icon color for the sidebar
        </Text>
      </Box>

      <Flex gap={2} alignItems="center">
        <ColorPicker
          keyType="sidebar_icon_color"
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

export default SidebarIconColor;

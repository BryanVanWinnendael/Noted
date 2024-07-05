import { Flex, Box, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";
import CustomSwitch from "./CustomSwitch";

const SidebarIcons = () => {
  const { saveSettings, sidebarIcons } = useSettings();
  const { getMutedTextColor } = useColors();

  const muted_text_color = getMutedTextColor();

  const handleSidebarIcons = () => {
    saveSettings("sidebar_icons", !sidebarIcons);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Sidebar icons</Text>
        <Text color={muted_text_color}>
          Enable or disable the icons for the sidebar
        </Text>
      </Box>
      <CustomSwitch
        isChecked={sidebarIcons}
        onChange={handleSidebarIcons}
        id="sidebaricons"
      />
    </Flex>
  );
};

export default SidebarIcons;

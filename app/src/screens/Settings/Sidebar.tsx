import { Box, Stack, Text } from "@chakra-ui/react";
import ActionbarOpacity from "components/ActionbarOpacity";
import ExtensionLabel from "components/ExtensionLabel";
import SidebarIconColor from "components/SidebarIconColor";
import SidebarIcons from "components/SidebarIcons";
import SidebarOpacity from "components/SidebarOpacity";
import SidebarTextColor from "components/SidebarTextColor";

const Sidebar = () => {
  return (
    <Box>
      <Text fontSize="3xl" mb={4}>
        Sidebar
      </Text>
      <Stack gap={3} mr={5} mb={4}>
        <ExtensionLabel />
        <SidebarIcons />
        <ActionbarOpacity />
        <SidebarOpacity />
        <SidebarTextColor />
        <SidebarIconColor />
      </Stack>
    </Box>
  );
};

export default Sidebar;

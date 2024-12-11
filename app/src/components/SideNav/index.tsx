import { WorkspaceType } from "types";
import { Box, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useSettingsStore } from "stores/SettingsStore";
import CompactNavbar from "components/NavBar/CompactNavbar";
import Actions from "./Actions";
import TreeView from "./TreeView";
import { useWorkspaceStore } from "stores/WorkspaceStore";

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { textColor, secondaryBackgroundColor, getTransparent } = useColors();
  const { compactMode, sidebarOpacity, sidebarTextColor } = useSettingsStore();
  const { setActiveFolder } = useWorkspaceStore();

  const transparent_bg_color = getTransparent(
    sidebarOpacity,
    secondaryBackgroundColor,
  );

  const sortedItems = workspace.items?.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return 0;
  });

  const handleClickSidebar = () => {
    const folderPath = workspace.path.split("\\");
    folderPath.pop();
    setActiveFolder(workspace.path);
  };

  return (
    <Box w="full" h="full" pb={compactMode ? "5.3rem" : "3.3rem"}>
      {compactMode && <CompactNavbar />}
      <Actions />
      <Box
        mt={2}
        p={1}
        h="full"
        overflowY="hidden"
        bg={transparent_bg_color}
        rounded="md"
      >
        <Text
          pl={4}
          fontWeight="bold"
          fontSize="md"
          color={sidebarTextColor ? sidebarTextColor : textColor}
          pt={2}
          my={2}
        >
          {workspace.name}
        </Text>
        {sortedItems && (
          <Box onClick={handleClickSidebar} h="100%">
            <TreeView items={sortedItems} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Index;

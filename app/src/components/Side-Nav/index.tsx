import { WorkspaceType } from "types";
import { Box, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useSettings } from "contexts/SettingsContext";
import CompactNavbar from "components/Nav-Bar/CompactNavbar";
import Actions from "./Actions";
import TreeView from "./TreeView";
import { utils } from "utils/index";

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { getTextColor, getSecondaryBackgroundColor } = useColors();
  const { compactMode } = useSettings();
  const { sidebarOpacity } = useSettings();

  const background_color = getSecondaryBackgroundColor();
  const transparent_bg_color = utils.getTransparent(
    sidebarOpacity,
    background_color,
  );
  const text_color = getTextColor();

  const sortedItems = workspace.items?.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return 0;
  });

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
          color={text_color}
          pt={2}
          my={2}
        >
          {workspace.name}
        </Text>
        {sortedItems && <TreeView items={sortedItems} />}
      </Box>
    </Box>
  );
};

export default Index;

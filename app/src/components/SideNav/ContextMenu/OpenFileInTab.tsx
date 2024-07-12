import { Text, MenuItem } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { ContextMenu } from "types/index";
import { CgTab } from "react-icons/cg";

const OpenFIleInTab = ({ path }: ContextMenu) => {
  const { textColor, iconColor, backgroundColorDarker} = useColors();
  const { openFileInNewTab } = useWorkspace();

  const handleOpen = async () => {
    openFileInNewTab(path);
  };

  return (
    <>
      <MenuItem
        onClick={handleOpen}
        m={0}
        p={1}
        bg="transparent"
        color={textColor}
        rounded="md"
        px={2}
        _hover={{ bg: backgroundColorDarker }}
        gap={2}
      >
        <CgTab color={iconColor } width={5} height={5} />
        <Text fontSize="sm">Open in New Tab</Text>
      </MenuItem>
    </>
  );
};

export default OpenFIleInTab;

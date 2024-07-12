import { MenuItem, Text } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { ContextMenu } from "types/index";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

const SplitFile = ({ path }: ContextMenu) => {
  const { textColor, iconColor, backgroundColorDarker } = useColors();
  const { split } = useWorkspace();

  const handleSplit = () => {
    split(path);
  };

  return (
    <MenuItem
      onClick={handleSplit}
      m={0}
      p={1}
      bg="transparent"
      color={textColor}
      rounded="md"
      px={2}
      _hover={{ bg: backgroundColorDarker }}
      gap={2}
    >
      <BsReverseLayoutSidebarInsetReverse
        color={iconColor}
        width={5}
        height={5}
      />
      <Text fontSize="sm">Split</Text>
    </MenuItem>
  );
};

export default SplitFile;

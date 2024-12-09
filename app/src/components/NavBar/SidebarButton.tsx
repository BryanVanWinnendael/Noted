import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { BsLayoutSidebarInset } from "react-icons/bs";

const SidebarButton = () => {
  const { setShowSidebar, showSidebar } = useWorkspaceStore();
  const {
    accentColor,
    textColor,
    mutedTextColor,
    secondaryBackgroundColorLighter,
  } = useColors();

  return (
    <Tooltip
      placement="bottom"
      label={"Ctrl+S"}
      bg={secondaryBackgroundColorLighter}
      color={textColor}
      rounded="md"
    >
      <Flex
        justifyItems="center"
        alignItems="center"
        m={2}
        w="fit-content"
        h="fit-content"
      >
        <Icon
          as={BsLayoutSidebarInset}
          cursor="pointer"
          w="1.1rem"
          h="1.1rem"
          onClick={() => setShowSidebar(!showSidebar)}
          _hover={{ color: accentColor }}
          _active={{ opacity: 0.8 }}
          aria-label="side menu"
          color={mutedTextColor}
          bg="transparent"
        />
      </Flex>
    </Tooltip>
  );
};

export default SidebarButton;

import { Menu, MenuButton, Flex, Text, Tooltip, Icon } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { useSettingsStore } from "stores/SettingsStore";

const FolderButton = ({
  path,
  name,
  onClick,
  expanded,
}: {
  path: string;
  name: string;
  onClick: () => void;
  expanded: boolean;
}) => {
  const {
    textColor,
    iconColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
  } = useColors();
  const { setActiveFolder, activeFolder } = useWorkspaceStore();
  const { sidebarIcons, sidebarTextColor, sidebarIconColor } =
    useSettingsStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const color = sidebarTextColor ? sidebarTextColor : textColor;
  const colorIcon = sidebarIconColor ? sidebarIconColor : iconColor;

  const handleSetActiveFolder = (folderPath: string) => {
    setActiveFolder(folderPath);
  };

  const handleClick = () => {
    handleSetActiveFolder(path);
    onClick();
  };

  return (
    <Menu id={path} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Tooltip
        placement="bottom"
        label={name}
        bg={secondaryBackgroundColorLighter}
        color={color}
        rounded="md"
      >
        <MenuButton
          w="full"
          h="fit-content"
          onContextMenu={() => setIsOpen(true)}
          onClick={handleClick}
          color={color}
          _hover={{ bg: secondaryBackgroundColorDarker }}
          bg={activeFolder === path ? secondaryBackgroundColorDarker : ""}
          rounded="md"
          p={1}
          mb={0.5}
        >
          <Flex gap={1} alignItems="center">
            {sidebarIcons ? (
              <Icon
                w={4}
                h={4}
                as={expanded ? FaRegFolderOpen : FaRegFolder}
                color={colorIcon}
              />
            ) : (
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                className="flex justify-center items-center"
              >
                <Icon as={IoIosArrowForward} color={colorIcon} />
              </motion.span>
            )}

            <Text
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              fontSize="sm"
            >
              {name}
            </Text>
          </Flex>
        </MenuButton>
      </Tooltip>
      <ContextMenu path={path} name={name} type="folder" />
    </Menu>
  );
};

export default FolderButton;

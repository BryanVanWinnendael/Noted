import { Menu, MenuButton, Flex, Text, Tooltip, Icon } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { useSettings } from "contexts/SettingsContext";

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
  const { textColor, iconColor, secondaryBackgroundColorLighter, secondaryBackgroundColorDarker } =
    useColors();
  const { setActiveFolder } = useWorkspace();
  const { sidebarIcons } = useSettings();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        color={textColor}
        rounded="md"
      >
        <MenuButton
          w="full"
          h="fit-content"
          onContextMenu={() => setIsOpen(true)}
          onClick={handleClick}
          color={textColor}
          _hover={{ bg: secondaryBackgroundColorDarker }}
          rounded="md"
          p={1}
        >
          <Flex gap={1} alignItems="center">
            {sidebarIcons ? (
              <Icon
                w={4}
                h={4}
                as={expanded ? FaRegFolderOpen : FaRegFolder}
                color={iconColor}
              />
            ) : (
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                className="flex justify-center items-center"
              >
                <Icon as={IoIosArrowForward} color={iconColor} />
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

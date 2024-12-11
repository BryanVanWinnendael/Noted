import { Flex, Icon, Menu, MenuButton, Text, Tooltip } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import { useSettingsStore } from "stores/SettingsStore";
import { PiNoteDuotone } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineDraw } from "react-icons/md";

const FileButton = ({ path, name }: { path: string; name: string }) => {
  const {
    secondaryBackgroundColor,
    textColor,
    backgroundColor,
    iconColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
    getTransparent,
  } = useColors();
  const { extensionLabel, sidebarIcons, sidebarTextColor, sidebarIconColor } =
    useSettingsStore();
  const { setActiveFolder, activeTab, tabs, openFile } = useWorkspaceStore();
  const isActive = tabs[activeTab]?.path === path;
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const tab = tabs[activeTab];

  const color = sidebarTextColor ? sidebarTextColor : textColor;
  const colorIcon = sidebarIconColor ? sidebarIconColor : iconColor;

  const handleOpenFile = (filePath: string) => {
    const folderPath = filePath.split("\\");
    folderPath.pop();
    setActiveFolder(folderPath.join("\\"));
    openFile(filePath);
  };

  const getFileName = (path: string) => {
    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return path.substring(0, lastDotIndex);
    }
    return path;
  };

  const extension = name.split(".").pop();

  const getIcon = () => {
    switch (extension) {
      case "pdf":
        return <Icon w={4} h={4} as={FaRegFilePdf} color={colorIcon} />;
      case "excalidraw":
        return <Icon w={4} h={4} as={MdOutlineDraw} color={colorIcon} />;
      default:
        return <Icon w={4} h={4} as={PiNoteDuotone} color={colorIcon} />;
    }
  };

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} id={path}>
      <Tooltip
        placement="bottom"
        label={getFileName(name)}
        bg={secondaryBackgroundColorLighter}
        color={color}
        rounded="md"
      >
        <MenuButton
          p={1}
          bg={tab?.path === path ? secondaryBackgroundColorDarker : "none"}
          onClick={() => handleOpenFile(path)}
          onContextMenu={() => setIsOpen(true)}
          color={color}
          _hover={{ bg: secondaryBackgroundColorDarker }}
          rounded="md"
          w="full"
          h="fit-content"
          cursor="pointer"
        >
          <Flex gap={2} alignItems="center">
            {sidebarIcons && getIcon()}
            <Text
              textAlign="left"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              fontSize="sm"
            >
              {getFileName(name)}
            </Text>
            {extensionLabel && (
              <Flex
                px={2}
                rounded="md"
                bg={getTransparent(
                  0.6,
                  isActive ? backgroundColor : secondaryBackgroundColor,
                )}
              >
                {extension}
              </Flex>
            )}
          </Flex>
        </MenuButton>
      </Tooltip>

      <ContextMenu path={path} name={name} type="file" />
    </Menu>
  );
};

export default FileButton;

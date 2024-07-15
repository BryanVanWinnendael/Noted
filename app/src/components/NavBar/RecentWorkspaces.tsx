import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const RecentWorkspaces = () => {
  const {
    backgroundColor,
    textColor,
    borderColor,
    iconColor,
    backgroundColorDarker,
    getGlassBackground,
  } = useColors();
  const { recentWorkspaces, openFolder } = useWorkspace();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { glassBackground, glassEnabled } = useSettings();

  const isGlassEnabled = glassEnabled && glassBackground.navBar;

  const handleOpenWorkspace = (workspace: string) => {
    openFolder(workspace);
    setIsOpen(false);
  };

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <Menu
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      placement="end-end"
      closeOnSelect={false}
    >
      <MenuButton
        w="full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MenuItem
          display="flex"
          justifyContent="space-between"
          w="full"
          bg="transparent"
          px={4}
          gap={4}
          color={textColor}
          _hover={{ bg: backgroundColorDarker }}
        >
          <Text w="fit-content">Open Recent</Text>
          <IoIosArrowForward color={iconColor} />
        </MenuItem>
      </MenuButton>

      <MenuList
        py={2}
        className="glass"
        border="1px"
        borderColor={borderColor}
        bg={
          isGlassEnabled ? getGlassBackground(backgroundColor) : backgroundColor
        }
        rounded="md"
        shadow="none"
        zIndex={99999999}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {recentWorkspaces &&
          recentWorkspaces.map((workspace, index) => (
            <MenuItem
              display="flex"
              justifyContent="space-between"
              w="full"
              bg="transparent"
              px={4}
              gap={4}
              color={textColor}
              _hover={{ bg: backgroundColorDarker }}
              key={index}
              onClick={() => handleOpenWorkspace(workspace)}
            >
              <Text w="fit-content">{workspace}</Text>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default RecentWorkspaces;

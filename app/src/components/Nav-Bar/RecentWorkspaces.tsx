import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useState } from "react";
import { utils } from "utils/index";
import { IoIosArrowForward } from "react-icons/io";

const RecentWorkspaces = () => {
  const { getBackgroundColor, getTextColor, getBorderColor, getIconColor } =
    useColors();
  const { recentWorkspaces, openFolder } = useWorkspace();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { glassBackground, glassEnabled } = useSettings();

  const bg_color = getBackgroundColor();
  const text_color = getTextColor();
  const border_color = getBorderColor();
  const icon_color = getIconColor();

  const isGlassEnabled = glassEnabled && glassBackground.navBar;

  const handleOpenWorkspace = (workspace: string) => {
    openFolder(workspace);
    setIsOpen(false);
  };

  return (
    <Menu
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      placement="end-end"
      closeOnSelect={false}
    >
      <MenuButton w="full" onMouseEnter={() => setIsOpen(true)}>
        <MenuItem
          display="flex"
          justifyContent="space-between"
          w="full"
          bg="transparent"
          px={4}
          gap={4}
          color={text_color}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
        >
          <Text w="fit-content">Open Recent</Text>
          <IoIosArrowForward color={icon_color} />
        </MenuItem>
      </MenuButton>

      <MenuList
        py={2}
        className="glass"
        border="1px"
        borderColor={border_color}
        bg={isGlassEnabled ? utils.getGlassBackground(bg_color) : bg_color}
        rounded="md"
        shadow="none"
        zIndex={99999999}
      >
        {recentWorkspaces && recentWorkspaces.map((workspace, index) => (
          <MenuItem
            display="flex"
            justifyContent="space-between"
            w="full"
            bg="transparent"
            px={4}
            gap={4}
            color={text_color}
            _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
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

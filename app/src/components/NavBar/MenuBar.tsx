import { useWorkspaceStore } from "stores/WorkspaceStore";
import { useSettingsStore } from "stores/SettingsStore";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import RecentWorkspaces from "./RecentWorkspaces";

const MenuBar = () => {
  const {
    backgroundColor,
    accentColor,
    textColor,
    mutedTextColor,
    borderColor,
    backgroundColorDarker,
    getGlassBackground,
  } = useColors();
  const { openWorkspace, closeWorkspace, recentWorkspaces } =
    useWorkspaceStore();
  const { setColorMode } = useColorMode();
  const { onOpen, glassBackground, glassEnabled } = useSettingsStore();

  const isGlassEnabled = glassEnabled && glassBackground.navBar;

  const handleCloseWorkspace = () => {
    closeWorkspace();
    setColorMode("light");
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        border="none"
        ml={2}
        _hover={{ fill: accentColor }}
        fill={mutedTextColor}
      >
        <svg
          width="1rem"
          height="1rem"
          viewBox="0 0 85 85"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_10_3)">
            <path d="M0 2.38475H33.8151L57.1271 25.7039V50.8144L19.0891 12.9778L18.9704 82.6188H0V2.38475Z" />
            <path d="M85 82.6188H51.1921L27.8837 59.2961V34.1748L65.9217 72.0041L66.0368 2.3812H85V82.6188Z" />
          </g>
          <defs>
            <clipPath id="clip0_10_3">
              <rect width="85" height="85" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
          onClick={openWorkspace}
        >
          <Text w="fit-content">Open Workspace</Text>
          <Text color={mutedTextColor} w="fit-content">
            Ctrl + O
          </Text>
        </MenuItem>

        {recentWorkspaces.length > 0 && (
          <RecentWorkspaces recentWorkspaces={recentWorkspaces} />
        )}

        <MenuItem
          display="flex"
          justifyContent="space-between"
          w="full"
          bg="transparent"
          px={4}
          gap={4}
          color={textColor}
          _hover={{ bg: backgroundColorDarker }}
          onClick={handleCloseWorkspace}
        >
          <Text w="fit-content">Close Workspace</Text>
          <Text color={mutedTextColor} w="fit-content">
            Ctrl + R
          </Text>
        </MenuItem>

        <MenuItem
          display="flex"
          justifyContent="space-between"
          w="full"
          bg="transparent"
          px={4}
          gap={4}
          color={textColor}
          _hover={{ bg: backgroundColorDarker }}
          onClick={onOpen}
        >
          <Text w="fit-content">Settings</Text>
          <Text color={mutedTextColor} w="fit-content">
            Ctrl + P
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBar;

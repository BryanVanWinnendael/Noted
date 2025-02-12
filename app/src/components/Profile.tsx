import { Avatar, AvatarBadge, AvatarGroup, Text } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";

const Profile = () => {
  const { backgroundColor, accentColor, textColor, borderColor } = useColors();
  const { user, handleSignOutUser } = useWorkspaceStore();
  return (
    <Menu>
      <MenuButton>
        <Avatar
          bg={accentColor}
          textColor={textColor}
          name={user?.email || ""}
          size="sm"
        />
      </MenuButton>
      <MenuList
        py={2}
        className="glass"
        border="1px"
        borderColor={borderColor}
        bg={backgroundColor}
        rounded="md"
        shadow="none"
        zIndex={99999999}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text>Signed in as</Text>
        <Text
          mx={4}
          overflowX="hidden"
          overflowY="hidden"
          whiteSpace="nowrap"
          color={textColor}
        >
          {user?.email}
        </Text>
        <MenuItem
          display="flex"
          justifyContent="center"
          w="full"
          bg="transparent"
          px={4}
          gap={4}
          color={textColor}
        >
          <Button onClick={handleSignOutUser} colorScheme="red">
            Sign out
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;

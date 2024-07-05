import {
  Box,
  Card,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { utils } from "utils/index";

const ImportCard = ({ path }: { path: string }) => {
  const { getBackgroundColor, getBorderColor, getIconColor, getTextColor } =
    useColors();
  const { saveSettings, backgroundImage, customBackground } = useSettings();
  const { deleteImportedBackground } = useWorkspace();
  const selected = backgroundImage === "custom" && path === customBackground;
  const { glassBackground, glassEnabled } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const border_color = getBorderColor();
  const text_color = getTextColor();
  const icon_color = getIconColor();
  const bg_color = getBackgroundColor();
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color);

  const isGlassEnabled = glassEnabled && glassBackground.window;

  const handleClick = () => {
    saveSettings("background_image", "custom");
    saveSettings("custom_background", path);
  };

  const handleDelete = () => {
    deleteImportedBackground(path);
  };

  return (
    <Stack>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} id={path}>
        <MenuButton
          onContextMenu={() => setIsOpen(true)}
          onClick={handleClick}
          backgroundColor={bg_color}
          border="1px"
          borderColor={border_color}
          rounded="md"
          w={200}
          h={100}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          transition="all 0.3s"
        >
          <Card
            cursor="pointer"
            w={200}
            h={100}
            transition="all 0.3s"
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            _hover={{
              scale: 1.05,
            }}
          >
            <img
              src={path}
              alt="imported"
              className="rounded-[0.375rem] h-full w-full absolute"
            />
            {selected && (
              <Flex alignItems="center" gap={1} zIndex={2}>
                <IoIosCheckmarkCircle />
                <Text textAlign="center">selected</Text>
              </Flex>
            )}
            <Box
              transition="all 0.3s"
              _hover={{
                opacity: selected ? 0.3 : 0.1,
              }}
              w="full"
              h="full"
              position="absolute"
              bg="black"
              opacity={selected ? 0.3 : 0}
            />
          </Card>
        </MenuButton>
        <MenuList
          w="fit-content"
          className="glass"
          border="1px"
          borderColor={border_color}
          bg={
            isGlassEnabled
              ? utils.getGlassBackground(bg_color_lighter)
              : bg_color_lighter
          }
          rounded="md"
          shadow="none"
          zIndex={999999999999999}
          p={1}
        >
          <MenuItem
            onClick={handleDelete}
            m={0}
            p={1}
            bg="transparent"
            color={text_color}
            rounded="md"
            px={2}
            _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
            gap={2}
          >
            <MdDeleteOutline color={icon_color} width={5} height={5} />
            <Text fontSize="sm">Delete</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default ImportCard;

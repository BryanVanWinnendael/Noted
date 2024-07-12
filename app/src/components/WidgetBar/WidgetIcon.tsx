import {
  IconButton,
  useDisclosure,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { WidgetName } from "types";
import { useWidget } from "contexts/WidgetContext";
import useColors from "hooks/useColors";
import { useSettings } from "contexts/SettingsContext";

const WidgetIcon = ({ icon, name }: { icon: any; name: WidgetName }) => {
  const { accentColor, textColor, backgroundColor, borderColor, backgroundColorLighter, getTransparent,backgroundColorDarker, getGlassBackground } =
    useColors();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { selectedWidgets, setSelectedWidgets, setIsConnected } = useWidget();
  const { glassBackground, glassEnabled } = useSettings();

  const handleClick = (e: any) => {
    if (e.type === "contextmenu") {
      onOpen();
    }
  };

  const isGlassEnabled = glassEnabled && glassBackground.contextMenu;

  const handleSelect = (nWidget: number) => {
    const isNameIncluded = selectedWidgets.includes(name);
    const isInPosition = selectedWidgets[nWidget - 1] === name;

    if (isInPosition) return;

    setIsConnected(false);

    if (isNameIncluded) {
      if (nWidget === 1) {
        const newSelectedWidgets = [name, selectedWidgets[0]];
        setSelectedWidgets(newSelectedWidgets);
        return;
      } else {
        const newSelectedWidgets = [selectedWidgets[1], name];
        setSelectedWidgets(newSelectedWidgets);
        return;
      }
    } else {
      if (nWidget === 1) {
        const newSelectedWidgets = [name, selectedWidgets[1]];
        setSelectedWidgets(newSelectedWidgets);
        return;
      } else {
        const newSelectedWidgets = [selectedWidgets[0], name];
        setSelectedWidgets(newSelectedWidgets);
        return;
      }
    }
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton onContextMenu={(e) => handleClick(e)}>
        <Tooltip label={name} bg={backgroundColor} color={textColor} rounded="md">
          <IconButton
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
            aria-label="open widget context"
            bg={getTransparent(0.2, accentColor)}
            w={8}
            h={8}
            icon={icon}
          />
        </Tooltip>
      </MenuButton>
      <MenuList
        w="fit-content"
        className="glass"
        border="1px"
        borderColor={borderColor}
        bg={
          isGlassEnabled
            ? getGlassBackground(backgroundColorLighter)
            : backgroundColorLighter
        }
        rounded="md"
        shadow="none"
        zIndex={99999999}
        px={2}
      >
        <MenuItem
          m={0}
          onClick={() => handleSelect(1)}
          p={1}
          bg="transparent"
          color={textColor}
          rounded="md"
          px={2}
          _hover={{ bg: backgroundColorDarker }}
        >
          <Text>Set as first widget</Text>
        </MenuItem>
        <MenuItem
          m={0}
          onClick={() => handleSelect(2)}
          p={1}
          bg="transparent"
          color={textColor}
          rounded="md"
          px={2}
          _hover={{ bg: backgroundColorDarker }}
        >
          <Text>Set as second widget</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default WidgetIcon;

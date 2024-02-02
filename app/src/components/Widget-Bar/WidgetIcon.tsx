import {
  IconButton,
  useDisclosure,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { utils } from "utils"
import { WidgetName } from "types"
import { useWidget } from "contexts/WidgetContext"
import useColors from "hooks/useColors"
import { useSettings } from "contexts/SettingsContext"

const WidgetIcon = ({ icon, name }: { icon: any; name: WidgetName }) => {
  const { getAccentColor, getTextColor, getBackgroundColor, getBorderColor } =
    useColors()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { selectedWidgets, setSelectedWidgets, setIsConnected } = useWidget()
  const { glassBackground, glassEnabled } = useSettings()

  const accent_color = getAccentColor()

  const text_color = getTextColor()

  const handleClick = (e: any) => {
    if (e.type === "contextmenu") {
      onOpen()
    }
  }

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const border_color = getBorderColor()

  const isGlassEnabled = glassEnabled && glassBackground.window

  const handleSelect = (nWidget: number) => {
    const isNameIncluded = selectedWidgets.includes(name)
    const isInPosition = selectedWidgets[nWidget - 1] === name

    if (isInPosition) return

    setIsConnected(false)

    if (isNameIncluded) {
      if (nWidget === 1) {
        const newSelectedWidgets = [name, selectedWidgets[0]]
        setSelectedWidgets(newSelectedWidgets)
        return
      } else {
        const newSelectedWidgets = [selectedWidgets[1], name]
        setSelectedWidgets(newSelectedWidgets)
        return
      }
    } else {
      if (nWidget === 1) {
        const newSelectedWidgets = [name, selectedWidgets[1]]
        setSelectedWidgets(newSelectedWidgets)
        return
      } else {
        const newSelectedWidgets = [selectedWidgets[0], name]
        setSelectedWidgets(newSelectedWidgets)
        return
      }
    }
  }

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton onContextMenu={(e) => handleClick(e)}>
        <Tooltip label={name} bg={bg_color} color={text_color} rounded="md">
          <IconButton
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
            aria-label="open widget context"
            bg={utils.getTransparent(0.2, accent_color)}
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
        borderColor={border_color}
        bg={
          isGlassEnabled
            ? utils.getGlassBackground(bg_color_lighter)
            : bg_color_lighter
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
          color={text_color}
          rounded="md"
          px={2}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
        >
          <Text>Set as first widget</Text>
        </MenuItem>
        <MenuItem
          m={0}
          onClick={() => handleSelect(2)}
          p={1}
          bg="transparent"
          color={text_color}
          rounded="md"
          px={2}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
        >
          <Text>Set as second widget</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default WidgetIcon

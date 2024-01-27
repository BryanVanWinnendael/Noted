import {
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Box,
  Popover,
  Stack,
  Text,
  PopoverBody,
  Tooltip,
} from "@chakra-ui/react"
import { utils } from "utils"
import { WidgetName } from "types"
import { useWidget } from "contexts/WidgetContext"
import useColors from "hooks/useColors"

const WidgetIcon = ({ icon, name }: { icon: any; name: WidgetName }) => {
  const { getAccentColor, getSecondaryBackgroundColor, getTextColor } =
    useColors()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { selectedWidgets, setSelectedWidgets, setIsConnected } = useWidget()

  const accent_color = getAccentColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const bg_colorLeft = getSecondaryBackgroundColor()

  const text_color = getTextColor()

  const handleClick = (e: any) => {
    if (e.type === "contextmenu") {
      onOpen()
    }
  }

  const getBorderColor = () => {
    const color = utils.getTextColor(bg_color)
    if (color === "#fff") return "rgb(220,220,220, 0.2)"
    return "rgb(220,220,220, 0.8)"
  }

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
    <Box zIndex={1000}>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Tooltip label={name} bg={bg_color} color={text_color} rounded="md">
            <IconButton
              onContextMenu={(e) => handleClick(e)}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              aria-label="delete theme"
              bg={utils.getTransparent(0.2, accent_color)}
              w={8}
              h={8}
              icon={icon}
            />
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent border="none" bg={bg_color} w="fit-content">
          <PopoverArrow bg={bg_color} />
          <PopoverBody
            border="1px"
            borderColor={getBorderColor()}
            p={1}
            rounded="md"
          >
            <Stack p={1}>
              <Box
                onClick={() => handleSelect(1)}
                p={1}
                rounded="md"
                color={text_color}
                _hover={{
                  bg: utils.getDarkerColor("0.03", bg_colorLeft),
                }}
                cursor="pointer"
              >
                <Text>Set as first widget</Text>
              </Box>
              <Box
                onClick={() => handleSelect(2)}
                p={1}
                rounded="md"
                color={text_color}
                _hover={{
                  bg: utils.getDarkerColor("0.03", bg_colorLeft),
                }}
                cursor="pointer"
              >
                <Text>Set as second widget</Text>
              </Box>
            </Stack>
          </PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default WidgetIcon

import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { useWidget } from "contexts/WidgetContext"
import { BiMerge } from "react-icons/bi"
import { utils } from "utils"
import { useEditor } from "contexts/EditorContext"
import useColors from "hooks/useColors"

const Index = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
  } = useColors()
  const { isConnected, setIsConnected, canConnect, getCompatibleWidget } =
    useWidget()
  const { info } = useEditor()

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  return (
    <Box h="300px">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="xl" color={accent_color} fontWeight="semibold">
          Info
        </Text>
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("info")}`
                : `Connect to ${getCompatibleWidget("info")}`
            }
            bg={bg_color}
            color={text_color}
            rounded="md"
            zIndex={10}
          >
            <Button
              bg="transparent"
              w="fit-content"
              h="fit-content"
              _hover={{ bg: "transparent" }}
            >
              <BiMerge
                onClick={() => setIsConnected(!isConnected)}
                color={isConnected ? accent_color : icon_color}
              />
            </Button>
          </Tooltip>
        )}
      </Flex>
      <Stack></Stack>
    </Box>
  )
}

export default Index

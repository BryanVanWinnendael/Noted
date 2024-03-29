import { Box, Button, Center, Flex, Stack, Tooltip } from "@chakra-ui/react"
import TimerViewer from "components/Widget-Bar/Clock-Wdiget/TimerViewer"
import TimeViewer from "components/Widget-Bar/Clock-Wdiget/TimeViewer"
import { useWidget } from "contexts/WidgetContext"
import useColors from "hooks/useColors"
import { BiMerge } from "react-icons/bi"
import { utils } from "utils"

const Index = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
  } = useColors()
  const { isConnected, setIsConnected, canConnect, getCompatibleWidget } =
    useWidget()

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  return (
    <Box h="300px">
      <Flex justifyContent="flex-end" alignItems="center">
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("clock")}`
                : `Connect to ${getCompatibleWidget("clock")}`
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
      <Stack mt={2} gap={0}>
        <TimeViewer />
        <Center mt={5}>
          <TimerViewer />
        </Center>
      </Stack>
    </Box>
  )
}

export default Index

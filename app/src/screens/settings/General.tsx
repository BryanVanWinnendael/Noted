import { Box, Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { utils } from "utils"
import { ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons"
import { MyWindow } from "types"
import { useSettings } from "contexts/SettingsContext"
import UpdateToast from "components//UpdateToast"
import CustomSwitch from "components/CustomSwitch"
import useColors from "hooks/useColors"
import { APP_VERSION, TOAST_ID } from "utils/constants"
import { useState } from "react"
import { useWorkspace } from "contexts/WorkspaceContext"

declare let window: MyWindow

const invoke = window.electron.invoke

const General = () => {
  const {
    getSecondaryBackgroundColor,
    getAccentColor,
    getTextColor,
    getBorderColor,
    getIconColor,
    getMutedTextColor,
  } = useColors()
  const toast = useToast()
  const { saveSettings, checkUpdates, checkUpdate } = useSettings()
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false)
  const { setNewVersion } = useWorkspace()

  const text_color = getTextColor()

  const border_color = getBorderColor()

  const icon_color = getIconColor()

  const muted_text_color = getMutedTextColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const accent_color = getAccentColor()

  const handleLink = (link: string) => {
    invoke("openBrowser", link)
  }

  const handleCheckUpdate = async () => {
    setLoadingUpdates(true)
    const update = await checkUpdate()
    if (update) {
      if (toast.isActive(TOAST_ID)) return setLoadingUpdates(false)
      toast({
        id: TOAST_ID,
        duration: null,
        isClosable: true,
        render: () => <UpdateToast />,
      })
    } else {
      if (toast.isActive(TOAST_ID)) return setLoadingUpdates(false)
      toast({
        id: TOAST_ID,
        title: "No updates available",
        status: "info",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Flex
            border="1px"
            borderColor={border_color}
            alignItems="center"
            bg={bg_color}
            color={text_color}
            p={3}
            rounded="md"
          >
            <WarningIcon color={icon_color} mr={3} />
            <Text>No updates available</Text>
          </Flex>
        ),
      })
    }
    setLoadingUpdates(false)
  }

  const changeCheckUpdates = () => {
    saveSettings("check_updates", !checkUpdates)
  }

  return (
    <Box color={text_color}>
      <Text fontSize="3xl" mb={4}>
        General
      </Text>
      <Stack mr={5} gap={3}>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Current version: {APP_VERSION}</Text>
            <Text
              onClick={() =>
                handleLink(
                  "https://github.com/BryanVanWinnendael/Noted/releases/latest",
                )
              }
              cursor="pointer"
              color={accent_color}
            >
              Read changelog <ExternalLinkIcon mx="2px" />
            </Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={handleCheckUpdate}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
            isLoading={loadingUpdates}
          >
            Check for updates
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">What's new</Text>
            <Text
              color={muted_text_color}
            >
              Read What's new in {APP_VERSION}
            </Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={()=> setNewVersion(true)}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
          >
            Read
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Check for updates on launch</Text>
            <Text color={muted_text_color}>
              Get notified when a new version is available
            </Text>
          </Box>

          <CustomSwitch
            isChecked={checkUpdates}
            onChange={changeCheckUpdates}
            id="checkUpdates"
          />
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Help</Text>
            <Text color={muted_text_color}>Learn how to use Noted</Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={() => handleLink("https://write-noted.vercel.app/docs")}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
          >
            Open
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

export default General

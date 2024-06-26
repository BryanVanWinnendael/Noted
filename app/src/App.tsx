import NavBar from "components/Nav-Bar"
import { useCallback, useEffect, useState } from "react"
import {
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react"
import Settings from "screens/Settings"
import { useSettings } from "contexts/SettingsContext"
import Home from "screens/Home"
import { useWorkspace } from "contexts/WorkspaceContext"
import LoadInWorkspace from "components/LoadInWorkspace"
import useColors from "hooks/useColors"
import useShortcuts from "hooks/useShortcuts"
import OpenFileInTab from "components/OpenFileInTab"
import Compact from "components/Nav-Bar/Compact"
import FileSwitcher from "components/File-Switcher"
import DragAndDrop from "components/DragAndDrop"
import OpenNewFile from "components/OpenNewFile"
import { useSlash } from "contexts/SlashContext"
import SlashCommands from "components/Slash-Commands"
import { backgrounds } from "utils/images"
import { utils } from "./utils"
import WhatsNew from "components/Whats-New"
import ConfettiExplosion from "react-confetti-explosion"
import UpdateToast from "components/UpdateToast"
import { TOAST_ID } from "utils/constants"

const App = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { slashOpen } = useSlash()
  const { getAccentColor, getBackgroundColor } = useColors()
  const {
    initSettings,
    compactMode,
    activeTheme,
    glassEnabled,
    backgroundImage,
    blur,
    glassBackground,
    customBackground,
    scrollbar,
    wallpaperBrightness,
    checkUpdates,
  } = useSettings()
  const { workspace, isLoaded, showSwitcher, newVersion, showConfetti } =
    useWorkspace()
  const { useAddShortcuts } = useShortcuts()
  const { setColorMode } = useColorMode()

  const toast = useToast()
  const { checkUpdate } = useSettings()

  useAddShortcuts()

  const accent_color = getAccentColor()

  const bg_color = getBackgroundColor()

  const setChakraColorMode = useCallback(() => {
    setColorMode(activeTheme)
  }, [activeTheme, setColorMode])

  const getBackground = () => {
    if (backgroundImage === "custom") return customBackground
    return backgrounds[backgroundImage]?.image
      ? `url(${backgrounds[backgroundImage]?.image})`
      : "transparent"
  }

  const handleCheckUpdate = async () => {
    const update = await checkUpdate()
    if (update) {
      if (toast.isActive(TOAST_ID)) return
      toast({
        id: TOAST_ID,
        duration: null,
        isClosable: true,
        render: () => <UpdateToast />,
      })
    }
  }

  useEffect(() => {
    if (glassEnabled && glassBackground.window)
      document.getElementsByTagName("html")[0].style.backgroundColor =
        "transparent"
    else
      document.getElementsByTagName("html")[0].style.backgroundColor = bg_color
  }, [bg_color, glassBackground.window, glassEnabled])

  useEffect(() => {
    initSettings()
    setChakraColorMode()
    setLoaded(true)
  }, [initSettings, setChakraColorMode, workspace?.path])

  useEffect(() => {
    if (checkUpdates && loaded) {
      handleCheckUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, checkUpdates])

  // Styles for custom scrollbar
  useEffect(() => {
    const styleId = "custom-scrollbar-styles"

    // Remove existing styles if present
    const existingStyle = document.getElementById(styleId)
    if (existingStyle) {
      existingStyle.parentNode?.removeChild(existingStyle)
    }

    const style = document.createElement("style")
    const color = utils.getTransparent(scrollbar.opacity, scrollbar.color)
    style.id = styleId
    style.innerHTML = `
      body {
        /* Custom scrollbar styles */
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${color} !important;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: ${color} !important;
        }
      }
    `
    document.head.appendChild(style)
  }, [scrollbar.color, scrollbar.opacity])

  const renderWorkspace = () => {
    if (!isLoaded)
      return (
        <Center w="full" h="full">
          <Spinner color={accent_color} />
        </Center>
      )
    return workspace ? <Home workspace={workspace} /> : <LoadInWorkspace />
  }

  return (
    <DragAndDrop>
      <Box>
        {showConfetti && (
          <Flex justifyContent="center" w="100%">
            <ConfettiExplosion
              zIndex={99999999}
              particleCount={250}
              width={1600}
            />
          </Flex>
        )}
        {newVersion && <WhatsNew />}
        {backgroundImage === "custom" ? (
          <img
            style={{
              filter: `blur(${blur}px) brightness(${wallpaperBrightness})`,
            }}
            src={getBackground()}
            alt="background"
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <Box
            position="absolute"
            bg={getBackground()}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            w="100vw"
            h="100vh"
            filter={`blur(${blur}px) brightness(${wallpaperBrightness})`}
          />
        )}

        <Settings />
        {!compactMode ? <NavBar /> : <Compact />}

        <Stack w="100vw" h="100vh">
          {renderWorkspace()}
        </Stack>
        <OpenFileInTab />
        <OpenNewFile />
        {showSwitcher && <FileSwitcher />}
        {slashOpen && <SlashCommands />}
      </Box>
    </DragAndDrop>
  )
}

export default App

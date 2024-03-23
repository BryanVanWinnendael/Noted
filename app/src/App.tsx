import NavBar from "components/Nav-Bar"
import { useCallback, useEffect } from "react"
import { Box, Center, Spinner, Stack, useColorMode } from "@chakra-ui/react"
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
import GlassBackground from "components/GlassBackground"
import UpdateWrapper from "components/UpdateWrapper"
import OpenNewFile from "components/OpenNewFile"
import { useSlash } from "contexts/SlashContext"
import SlashCommands from "components/Slash-Commands"
import { backgrounds } from "utils/images"

const App = () => {
  const { slashOpen } = useSlash()
  const { getAccentColor, getBackgroundColor } = useColors()
  const { initSettings, compactMode, activeTheme, glassEnabled, backgroundImage, blur } = useSettings()
  const { workspace, isLoaded, showSwitcher } = useWorkspace()
  const { useAddShortcuts } = useShortcuts()
  const { setColorMode } = useColorMode()

  useAddShortcuts()

  const accent_color = getAccentColor()

  const bg_color = getBackgroundColor()

  const setChakraColorMode = useCallback(() => {
    setColorMode(activeTheme)
  }, [activeTheme, setColorMode])

  useEffect(() => {
    const isDefault =
      localStorage.getItem("chakra-ui-color-mode") === "light" ||
      localStorage.getItem("chakra-ui-color-mode") === "dark"
        ? true
        : false
    document.getElementsByTagName("html")[0].style.backgroundColor = isDefault
      ? "transparent"
      : bg_color
    document.getElementsByTagName("html")[0].style.color = "white"
  }, [bg_color])

  useEffect(() => {
    initSettings()
    setChakraColorMode()
  }, [initSettings, setChakraColorMode, workspace?.path])

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
    <UpdateWrapper>
      <DragAndDrop>
        <Box
          position="relative"
        >
           <Box
            position="absolute"
            bg={backgrounds[backgroundImage]?.image ? `url(${backgrounds[backgroundImage]?.image})` : "transparent"} 
            backgroundSize="cover" backgroundRepeat="no-repeat"
            w="100vw" 
            h="100vh"
            filter={`blur(${blur}px)`}
            />
          {glassEnabled && <GlassBackground />}
          <Settings />
          {!compactMode ? <NavBar /> : <Compact />}
         
            <Stack 
              w="100vw"
              h="100vh"
              >
                {renderWorkspace()}
            </Stack>
          <OpenFileInTab />
          <OpenNewFile />
          {showSwitcher && <FileSwitcher />}
          {slashOpen && <SlashCommands />}
        </Box>
      </DragAndDrop>
    </UpdateWrapper>
  )
}

export default App

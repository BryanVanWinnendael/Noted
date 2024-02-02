import NavBar from "components/Nav-Bar"
import { useCallback, useEffect } from "react"
import { Center, Spinner, Stack, useColorMode } from "@chakra-ui/react"
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

const App = () => {
  const { getAccentColor, getBackgroundColor } = useColors()
  const { initSettings, compactMode, activeTheme } = useSettings()
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
        <>
          <GlassBackground />
          <Settings />
          {!compactMode ? <NavBar /> : <Compact />}
          <Stack h="full">{renderWorkspace()}</Stack>
          <OpenFileInTab />
          <OpenNewFile />
          {showSwitcher && <FileSwitcher />}
        </>
      </DragAndDrop>
    </UpdateWrapper>
  )
}

export default App

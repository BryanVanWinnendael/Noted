import NavBar from "components/Nav-Bar"
import { useCallback, useEffect } from "react"
import { Box, Center, Spinner, Stack } from "@chakra-ui/react"
import Settings from "screens/Settings"
import { useSettings } from "contexts/SettingsContext"
import { MyWindow } from "types"
import { useToast } from "@chakra-ui/react"
import UpdateToast from "components/UpdateToast"
import Home from "screens/Home"
import { useWorkspace } from "contexts/WorkspaceContext"
import LoadInWorkspace from "components/LoadInWorkspace"
import useColors from "hooks/useColors"
import { TOAST_ID } from "utils/constants"
import useShortcuts from "hooks/useShortcuts"
import OpenFileInTab from "components/OpenFileInTab"
import Compact from "components/Nav-Bar/Compact"

declare let window: MyWindow
const ipcRenderer = window.myApp.getIpcRenderer()

const App = () => {
  const toast = useToast()
  const { getAccentColor, getBackgroundColor } = useColors()
  const { handleAutoUpdate, initSettings, glassBackground, compactMode } = useSettings()
  const { workspace, isLoaded } = useWorkspace()
  const { useAddShortcuts } = useShortcuts()

  useAddShortcuts()

  const accent_color = getAccentColor()

  const bg_color = getBackgroundColor()

  const handleElectronMessages = useCallback(() => {
    window.electron?.ipcRenderer.on("loaded", (args: any) => {
      switch (args) {
        case "update downloaded":
          if (toast.isActive(TOAST_ID)) return
          toast({
            id: TOAST_ID,
            duration: null,
            isClosable: true,
            render: () => <UpdateToast />,
          })
          break
        default:
          break
      }
    })
  }, [toast])

  useEffect (() => {
    const isDefault = localStorage.getItem("chakra-ui-color-mode") === "light" || localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false
    document.getElementsByTagName("html")[0].style.backgroundColor = isDefault ?  "transparent" :  bg_color
    document.getElementsByTagName("html")[0].style.color = "white"
  }, [bg_color])


  useEffect(() => {
    handleElectronMessages()
    handleAutoUpdate()
  }, [handleAutoUpdate, handleElectronMessages])

  useEffect(() => {
    initSettings()
  }, [initSettings, workspace?.path])

  useEffect(() => {
    if (!glassBackground.window) return
    window.electron?.ipcRenderer.on('wallpaper', (arg: any) => {
      const background = document.querySelector('#background') as HTMLImageElement
      if (!background) return
      background.src = `file://${arg.wallpaper}`
      background.width = arg.width + 20
      background.height = arg.height + 70
      background.style.top = `${arg.top <= 30 ? '' : '-'}${Math.abs(arg.top - 30)}px`
      background.style.left = `${arg.left < 0 ? '' : '-'}${Math.abs(arg.left)}px`
    });

    ipcRenderer.send('asynchronous-message', 'ping');
  }, [glassBackground.window])

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
    <Box w="full" h="100vh">
      <img id="background" alt=""/>
      <Settings />
      { !compactMode ? <NavBar /> : <Compact /> }
      <Stack h="full">{renderWorkspace()}</Stack>
      <OpenFileInTab />
    </Box>
  )
}

export default App

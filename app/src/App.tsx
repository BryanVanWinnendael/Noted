import Navbar from "components/nav/Navbar"
import { useEffect, useRef } from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogOverlay, Box, useColorModeValue } from "@chakra-ui/react"
import Settings from "screens/settings"
import { getStyle } from "styling"
import { useSettings } from "contexts/SettingsContext"
import MDEditor from "components/editor"
import { useFile } from "contexts/FileContext"
import { utils } from "utils"
import { useCommands } from "contexts/CommandContext"
import CommandPalette from "components/commandPalette"

const Render = () => {
  const { currentTab, file_name } = useFile()
  const { theme } = useSettings()
  const bg_color_chakra = useColorModeValue("white", "#1A202C")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra 
  const { commandsOpen, setCommandsOpen } = useCommands()
  const cancelRef = useRef()

  useEffect (() => {
    document.getElementsByTagName("html")[0].style.backgroundColor = bg_color
    document.getElementsByTagName("html")[0].style.color = "white"
  }, [bg_color, theme])

  return (
    <Box paddingBottom={5} bg={bg_color}>
      <Navbar />
      <Settings />
        {Object.keys(file_name).map((key, index) => (
          currentTab === index &&
          <Box key={index} w="full" h="full" p={0} pt={14}>
            <div className="flex h-full ml-5 mr-5 justify-center">
              <MDEditor />
            </div>
          </Box>
        ))}
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef as any}
        onClose={() => setCommandsOpen(false)}
        isOpen={commandsOpen}
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg={bg_color} color={utils.getTextColor(bg_color)}>
          <AlertDialogBody>
              <CommandPalette />
          </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
    </Box>
  )
}

function App() {
  const { theme } = useSettings()

  return (
    theme ? <Render /> : <Render />
  )
}

export default App

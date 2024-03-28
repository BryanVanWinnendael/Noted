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
import { utils } from "./utils"
import WhatsNew from "components/Whats-New"

const App = () => {
  const { slashOpen } = useSlash()
  const { getAccentColor, getBackgroundColor } = useColors()
  const { initSettings, compactMode, activeTheme, glassEnabled, backgroundImage, blur, customBackground, scrollbar, wallpaperBrightness } = useSettings()
  const { workspace, isLoaded, showSwitcher, newVersion } = useWorkspace()
  const { useAddShortcuts } = useShortcuts()
  const { setColorMode } = useColorMode()

  useAddShortcuts()

  const accent_color = getAccentColor()

  const bg_color = getBackgroundColor()

  const setChakraColorMode = useCallback(() => {
    setColorMode(activeTheme)
  }, [activeTheme, setColorMode])

  const getBackground = () => {
    if (backgroundImage === "custom") return customBackground
    return backgrounds[backgroundImage]?.image ? `url(${backgrounds[backgroundImage]?.image})` : "transparent"
  }

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.backgroundColor = bg_color
  }, [bg_color])

  useEffect(() => {
    initSettings()
    setChakraColorMode()
  }, [initSettings, setChakraColorMode, workspace?.path])

  useEffect(() => {
    const styleId = 'custom-scrollbar-styles';

    // Remove existing styles if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.parentNode?.removeChild(existingStyle);
    }
    
    const style = document.createElement('style');
    const color = utils.getTransparent(scrollbar.opacity, scrollbar.color)
    style.id = styleId;
    style.innerHTML = `
      body {
        /* Other styles for body */

        /* Custom scrollbar styles */
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${color} !important;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #c71010 !important;
        }
      }
    `;
    document.head.appendChild(style);
  },[scrollbar.color, scrollbar.opacity])

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
          {
            newVersion && <WhatsNew />
          }
          {
            backgroundImage === "custom" ? 
            <img 
            style={{filter: `blur(${blur}px) brightness(${wallpaperBrightness})`}}
            src={getBackground()} alt="background" className="absolute w-full h-full object-cover" />
            : 
            <Box
            position="absolute"
            bg={getBackground()} 
            backgroundSize="cover" backgroundRepeat="no-repeat"
            w="100vw" 
            h="100vh"
            filter={`blur(${blur}px) brightness(${wallpaperBrightness})`}
            />
          }

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

import NavBar from "components/NavBar";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import Settings from "screens/Settings";
import { useSettings } from "contexts/SettingsContext";
import Home from "screens/Home";
import { useWorkspace } from "contexts/WorkspaceContext";
import LoadInWorkspace from "components/LoadInWorkspace";
import useColors from "hooks/useColors";
import useShortcuts from "hooks/useShortcuts";
import OpenFileInTab from "components/OpenFileInTab";
import Compact from "components/NavBar/Compact";
import FileSwitcher from "components/FileSwitcher";
import DragAndDrop from "components/DragAndDrop";
import OpenNewFile from "components/OpenNewFile";
import { useSlash } from "contexts/SlashContext";
import SlashCommands from "components/SlashCommands";
import { backgrounds } from "utils/images";
import WhatsNew from "components/WhatsNew";
import ConfettiExplosion from "react-confetti-explosion";
import UpdateToast from "components/UpdateToast";
import { TOAST_ID } from "utils/constants";
import CommandPalette from "components/CommandPalette";

const App = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { slashOpen } = useSlash();
  const { accentColor, backgroundColor, getTransparent } = useColors();
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
  } = useSettings();
  const { workspace, isLoaded, showSwitcher, newVersion, showConfetti } =
    useWorkspace();
  const { useAddShortcuts } = useShortcuts();
  const { setColorMode } = useColorMode();

  const toast = useToast();
  const { checkUpdate } = useSettings();

  useAddShortcuts();

  const init = useCallback(async () => {
    setColorMode(activeTheme);
    await initSettings();
    setLoaded(true);
  }, [activeTheme, initSettings, setColorMode]);

  const getBackground = () => {
    if (backgroundImage === "custom") return customBackground;
    return backgrounds[backgroundImage]?.image
      ? `url(${backgrounds[backgroundImage]?.image})`
      : "transparent";
  };

  const handleCheckUpdate = async () => {
    const update = await checkUpdate();
    if (update) {
      if (toast.isActive(TOAST_ID)) return;
      toast({
        id: TOAST_ID,
        duration: null,
        isClosable: true,
        render: () => <UpdateToast version={update} />,
      });
    }
  };

  useEffect(() => {
    if (glassEnabled && glassBackground.window)
      document.getElementsByTagName("html")[0].style.backgroundColor =
        "transparent";
    else
      document.getElementsByTagName("html")[0].style.backgroundColor =
        backgroundColor;
  }, [backgroundColor, glassBackground.window, glassEnabled]);

  useEffect(() => {
    if (checkUpdates && loaded) {
      handleCheckUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, checkUpdates]);

  useEffect(() => {
    init();
  }, [init, workspace?.path]);

  // Styles for custom scrollbar
  useEffect(() => {
    const styleId = "custom-scrollbar-styles";

    // Remove existing styles if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.parentNode?.removeChild(existingStyle);
    }

    const style = document.createElement("style");
    const color = getTransparent(scrollbar.opacity, scrollbar.color);
    style.id = styleId;
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
    `;
    document.head.appendChild(style);
  }, [getTransparent, scrollbar.color, scrollbar.opacity]);

  const renderWorkspace = () => {
    if (!isLoaded)
      return (
        <Center w="full" h="full">
          <Spinner color={accentColor} />
        </Center>
      );
    return workspace ? <Home workspace={workspace} /> : <LoadInWorkspace />;
  };

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
        <CommandPalette />
      </Box>
    </DragAndDrop>
  );
};

export default App;

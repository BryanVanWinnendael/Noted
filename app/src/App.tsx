import NavBar from "components/NavBar";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import Settings from "screens/Settings";
import Home from "screens/Home";
import LoadInWorkspace from "components/LoadInWorkspace";
import Compact from "components/NavBar/Compact";
import DragAndDrop from "components/DragAndDrop";
import FileSwitcher from "components/FileSwitcher";
import OpenFileInTab from "components/OpenFileInTab";
import OpenNewFile from "components/OpenNewFile";
import SlashCommands from "components/SlashCommands";
import CommandPalette from "components/CommandPalette";
import ConfettiExplosion from "react-confetti-explosion";
import WhatsNew from "components/WhatsNew";
import UpdateToast from "components/UpdateToast";
import { useSlashStore } from "stores/SlashStore";
import { useSettingsStore } from "stores/SettingsStore";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import useShortcuts from "hooks/useShortcuts";
import { backgrounds } from "utils/images";
import { TOAST_ID } from "utils/constants";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const { slashOpen } = useSlashStore();
  const { accentColor, getTransparent, backgroundColor } = useColors();
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
    checkUpdate,
  } = useSettingsStore();
  const {
    workspace,
    workspaceState,
    showSwitcher,
    newVersion,
    showConfetti,
    initWorkspace,
  } = useWorkspaceStore();
  const { setColorMode } = useColorMode();
  const toast = useToast();
  const { useAddShortcuts } = useShortcuts();

  useAddShortcuts();

  // Initialization logic
  useEffect(() => {
    const initApp = async () => {
      if (workspaceState === "opening") {
        initWorkspace();
      } else if (workspaceState === "closed" || workspaceState === "opened") {
        // Load the settings when a workspace has been initialized/opened
        // or when a workspace is closed so that the settings are set to default
        initSettings();
        setLoaded(true);
      }
    };

    initApp();
  }, [initSettings, initWorkspace, workspaceState]);

  // Set color mode for active theme
  useEffect(() => {
    setColorMode(activeTheme);
  }, [activeTheme, setColorMode]);

  useEffect(() => {
    const handleUpdateCheck = async () => {
      if (checkUpdates && loaded) {
        const update = await checkUpdate();
        if (update && !toast.isActive(TOAST_ID)) {
          toast({
            id: TOAST_ID,
            duration: null,
            isClosable: true,
            render: () => <UpdateToast />,
          });
        }
      }
    };

    handleUpdateCheck();
  }, [checkUpdates, loaded, checkUpdate, toast]);

  // Custom scrollbar styles
  useEffect(() => {
    const styleId = "custom-scrollbar-styles";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.parentNode?.removeChild(existingStyle);
    }

    const style = document.createElement("style");
    const color = getTransparent(scrollbar.opacity, scrollbar.color);
    style.id = styleId;
    style.innerHTML = `
      body {
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

    return () => {
      const cleanupStyle = document.getElementById(styleId);
      cleanupStyle?.parentNode?.removeChild(cleanupStyle);
    };
  }, [getTransparent, scrollbar.color, scrollbar.opacity]);

  // Glass background logic
  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.style.backgroundColor =
      glassEnabled && glassBackground.window ? "transparent" : backgroundColor;
  }, [glassEnabled, glassBackground.window, backgroundColor]);

  // Background images styles
  const backgroundStyles = useMemo(() => {
    const background =
      backgroundImage === "custom"
        ? customBackground
        : backgrounds[backgroundImage]?.image || "transparent";
    return {
      background,
      filter: `blur(${blur}px) brightness(${wallpaperBrightness})`,
    };
  }, [backgroundImage, customBackground, blur, wallpaperBrightness]);

  const renderWorkspace = () => {
    if (workspaceState === "opening") {
      return (
        <Center w="full" h="full">
          <Spinner color={accentColor} />
        </Center>
      );
    }
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

        {backgroundImage === "custom" ||
        backgroundStyles.background !== "transparent" ? (
          <Image
            src={backgroundStyles.background}
            alt="background"
            className="absolute w-full h-full object-cover"
            filter={backgroundStyles.filter}
          />
        ) : (
          <Box
            position="absolute"
            bg={backgroundStyles.background}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            w="100vw"
            h="100vh"
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

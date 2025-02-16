import { useSettingsStore } from "stores/SettingsStore";
import useUpdate from "hooks/useUpdate";
import { useToast } from "@chakra-ui/react";

export interface CommandSettingsProps {
  openThemeDialog: () => void;
}

const useCommandSettings = ({ openThemeDialog }: CommandSettingsProps) => {
  const {
    onOpen,
    setView,
    headerColorsEnabled,
    saveSettings,
    glassEnabled,
    editorTitle,
    compactMode,
    pushRepo,
  } = useSettingsStore();
  const toast = useToast();
  const { handleCheckUpdate } = useUpdate();

  const openSettings = () => {
    onOpen();
  };

  const openGeneral = () => {
    setView("General");
    onOpen();
  };

  const openActions = () => {
    setView("Actions");
    onOpen();
  };

  const openAppearance = () => {
    setView("Appearance");
    onOpen();
  };

  const openSidebar = () => {
    setView("Sidebar");
    onOpen();
  };

  const openBackground = () => {
    setView("Background");
    onOpen();
  };

  const openCustomThemes = () => {
    setView("Custom themes");
    onOpen();
  };

  const openMarket = () => {
    setView("Market");
    onOpen();
  };

  const openShortcuts = () => {
    setView("Shortcuts");
    onOpen();
  };

  const openTheme = () => {
    openThemeDialog();
  };

  const checkUpdates = () => {
    handleCheckUpdate();
  };

  const handleCustomHeaders = () => {
    saveSettings("header_colors_enabled", !headerColorsEnabled);
  };

  const handleGlassBackground = () => {
    saveSettings("glass_background_enabled", !glassEnabled);
  };

  const handleEditorTitle = () => {
    saveSettings("editor_title", !editorTitle);
  };

  const handleCompactMode = () => {
    saveSettings("compact_mode", !compactMode);
  };

  const handlePushToGithub = async () => {
    const success = await pushRepo();
    if (success) {
      toast({
        title: "Pushed to github",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to push to github",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return {
    Settings: openSettings,
    "General settings": openGeneral,
    "Actions settings": openActions,
    "Appearance settings": openAppearance,
    "Sidebar settings": openSidebar,
    "Background settings": openBackground,
    "Themes settings": openCustomThemes,
    "Market settings": openMarket,
    "Shortcuts settings": openShortcuts,
    "Switch theme": openTheme,
    "Check for updates": checkUpdates,
    "Enable/disable custom headers": handleCustomHeaders,
    "Enable/disable glass background": handleGlassBackground,
    "Enable/disable editor title": handleEditorTitle,
    "Enable/disable compact mode": handleCompactMode,
    "Push to github": handlePushToGithub,
  };
};

export default useCommandSettings;

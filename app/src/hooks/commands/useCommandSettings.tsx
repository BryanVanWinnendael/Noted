import { useSettings } from "contexts/SettingsContext";
import useUpdate from "hooks/useUpdate";

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
  } = useSettings();
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
  };
};

export default useCommandSettings;

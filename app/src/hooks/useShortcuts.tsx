import { useColorMode } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import { useWidgetStore } from "stores/WidgetStore";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { useHotkeys } from "react-hotkeys-hook";

const useShortcuts = () => {
  const {
    setShowSidebar,
    showSidebar,
    setShowOpenFileInTab,
    setShowOpenNewFile,
    openWorkspace,
    setShowSwitcher,
    closeWorkspace,
    setShowCmdPalette,
  } = useWorkspaceStore();
  const { setWidgetPanel, widgetPanel } = useWidgetStore();
  const { onOpen } = useSettingsStore();
  const { setColorMode } = useColorMode();

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNewTabAndOpenFile = () => {
    setShowOpenFileInTab(true);
  };

  const handleOpenNewFile = () => {
    setShowOpenNewFile(true);
  };

  const handleWidgetPanel = () => {
    setWidgetPanel(!widgetPanel);
  };

  const handleOpenedWorkspace = () => {
    openWorkspace();
  };

  const handleCloseWorkspace = () => {
    closeWorkspace();
    setColorMode("light");
  };

  const handleOpenSwitcher = () => {
    setShowSwitcher(true);
  };

  const handleOpenSettings = () => {
    onOpen();
  };

  const handleOpenCommandPalette = () => {
    setShowCmdPalette(true);
  };

  const useAddShortcuts = () => {
    useHotkeys("ctrl+t", handleNewTabAndOpenFile, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+n", handleOpenNewFile, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+s", handleSidebar, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+w", handleWidgetPanel, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+o", handleOpenedWorkspace, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+r", handleCloseWorkspace, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+tab", handleOpenSwitcher, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+p", handleOpenSettings, {
      enableOnContentEditable: true,
    });
    useHotkeys("ctrl+space", handleOpenCommandPalette, {
      enableOnContentEditable: true,
    });
  };

  return {
    useAddShortcuts,
  };
};

export default useShortcuts;

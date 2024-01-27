import { useWidget } from 'contexts/WidgetContext'
import { useWorkspace } from 'contexts/WorkspaceContext'
import { useHotkeys } from 'react-hotkeys-hook'

const useShortcuts = () => {
  const { setShowSidebar, showSidebar, setOpenFileInTab } = useWorkspace()
  const { setWidgetPanel, widgetPanel } = useWidget()


  const handleSidebar= () => {
    setShowSidebar(!showSidebar)
  }

  const handleNewTabAndOpenFile = () => {
    setOpenFileInTab(true)
  }

  const handleWidgetPanel = () => {
    setWidgetPanel(!widgetPanel)
  }

  const useAddShortcuts = () => {
    useHotkeys('ctrl+t', handleNewTabAndOpenFile, {
      enableOnContentEditable: true
    })
    useHotkeys('ctrl+s', handleSidebar, {
      enableOnContentEditable: true
    })
    useHotkeys('ctrl+w', handleWidgetPanel, {
      enableOnContentEditable: true
    })
  }

  return {
    useAddShortcuts
  }
  
}

export default useShortcuts
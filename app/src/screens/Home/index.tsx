import { Box, Flex } from "@chakra-ui/react"
import Editor from "components/Editor"
import WidgetBar from "components/Widget-Bar"
import SideNav from "components/Side-Nav"
import { ActiveTab, WorkspaceType } from "types"
import { Panel, PanelGroup } from "react-resizable-panels"
import ResizeHandle from "components/ResizableHandle"
import { useWidget } from "contexts/WidgetContext"
import EditorWrapper from "styling/EditorWrapper"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import PdfViewer from "components/Pdf-Viewer"
import NoFile from "components/NoFile"
import { Allotment } from "allotment"
import "allotment/dist/style.css"
import { useCallback } from "react"
import ExcalidrawEditor from "components/Excalidraw-Editor"

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { showSidebar, tabs, activeTab } = useWorkspace()
  const length_tabs = Object.keys(tabs).length
  const { widgetPanel } = useWidget()
  const { glassEnabled, glassBackground, compactMode } = useSettings()
  const { getBackgroundColor } = useColors()
  const bg_color = getBackgroundColor()

  const isGlassEnabled = glassEnabled && glassBackground.window

  const openScreen = useCallback((tab: ActiveTab) => {
    if (!tab.path) return <NoFile />

    const path = tab.path
    const extension = path.split(".").pop()

    switch (extension) {
      case "noted":
        return <Editor path={path} />
      case "pdf":
        return <PdfViewer path={path} />
      case "excalidraw":
        return <ExcalidrawEditor path={path} />
      default:
        return <NoFile />
    }
  }, [])

  const openSplitScreen = useCallback((tab: ActiveTab) => {
    if (!tab.splittedPath) return <NoFile />

    const path = tab.splittedPath
    const extension = path.split(".").pop()

    switch (extension) {
      case "noted":
        return <Box pl={2} maxHeight="100%" h="full">
          <Editor splitted={true} path={path} />
        </Box>
      case "pdf":
        return  <Box pl={2} maxHeight="100%" h="full">
          <PdfViewer splitted={true} path={path} />
          </Box>
      case "excalidraw":
        return <Box pl={2} maxHeight="100%" h="full">
          <ExcalidrawEditor path={path}/>
        </Box>
      default:
        return <NoFile />
    }
  }, [])

  return (
    <Flex
      w="full"
      pt={compactMode ? 0 : 9}
      h="full"
      px={2}
      className="glass"
      bg={isGlassEnabled ? utils.getGlassBackground(bg_color) : bg_color}
    >
      <PanelGroup
        id={"sidebar"}
        autoSaveId="example"
        direction="horizontal"
        style={{
          maxHeight: "100%",
          marginTop: compactMode ? 0 : "5px",
          paddingBottom: "5px",
        }}
      >
        {showSidebar && (
          <>
            <Panel id="sidebar" order={1} minSize={13} maxSize={30}>
              <SideNav workspace={workspace} />
            </Panel>
            <ResizeHandle />
          </>
        )}

        <Panel
          id="editor"
          order={2}
          minSize={12}
          defaultSize={12}
          style={{ maxHeight: "100%" }}
        >
          <EditorWrapper>
            <>
              {length_tabs > 0 ? (
                Object.keys(tabs).map((key) => {
                  const tab = tabs[parseInt(key)]
                  const isActive = Number(key) === activeTab
                  return (
                    <Box
                      display={isActive ? "block" : "none"}
                      height="100%"
                      id={key}
                    >
                      <Allotment>
                        {openScreen(tab)}
                        {tab.splittedPath && openSplitScreen(tab)}
                      </Allotment>
                    </Box>
                  )
                })
              ) : (
                <NoFile />
              )}
            </>
          </EditorWrapper>
        </Panel>

        {widgetPanel && (
          <>
            <ResizeHandle />
            <Panel id="wdigetbar" order={3} minSize={12}>
              <WidgetBar />
            </Panel>
          </>
        )}
      </PanelGroup>
    </Flex>
  )
}

export default Index

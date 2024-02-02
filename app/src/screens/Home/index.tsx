import { Flex } from "@chakra-ui/react"
import Editor from "components/Editor"
import WidgetBar from "components/Widget-Bar"
import SideNav from "components/Side-Nav"
import { WorkspaceType } from "types"
import { Panel, PanelGroup } from "react-resizable-panels"
import ResizeHandle from "components/ResizableHandle"
import { useWidget } from "contexts/WidgetContext"
import EditorWrapper from "styling/EditorWrapper"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { utils } from "utils/index"

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { showSidebar } = useWorkspace()
  const { widgetPanel } = useWidget()
  const { glassEnabled, glassBackground, compactMode } = useSettings()
  const { getBackgroundColor } = useColors()

  const bg_color = getBackgroundColor()

  const isGlassEnabled = glassEnabled && glassBackground.window

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
            <Editor />
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

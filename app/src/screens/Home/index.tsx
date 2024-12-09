import { Box, Flex } from "@chakra-ui/react";
import Editor from "components/Editor";
import WidgetBar from "components/WidgetBar";
import SideNav from "components/SideNav";
import { ActiveTab, WorkspaceType } from "types";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "components/ResizableHandle";
import { useWidgetStore } from "stores/WidgetStore";
import EditorWrapper from "styling/EditorWrapper";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { useSettingsStore } from "stores/SettingsStore";
import PdfViewer from "components/PdfViewer";
import NoFile from "components/NoFile";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import ExcalidrawEditor from "components/ExcalidrawEditor";

const FILE_EXTENSIONS = {
  NOTED: "noted",
  PDF: "pdf",
  EXCALIDRAW: "excalidraw",
};

const TabContent = ({
  tab,
  index,
  isActive,
}: {
  tab: ActiveTab;
  index: number;
  isActive: boolean;
}) => {
  const renderContent = (path: string, tabKey: string, splitted: boolean) => {
    const extension = path.split(".").pop();
    const commonProps = { path, tabKey, splitted };

    switch (extension) {
      case FILE_EXTENSIONS.NOTED:
        return <Editor {...commonProps} />;
      case FILE_EXTENSIONS.PDF:
        return <PdfViewer {...commonProps} />;
      case FILE_EXTENSIONS.EXCALIDRAW:
        return <ExcalidrawEditor {...commonProps} />;
      default:
        return <NoFile />;
    }
  };

  if (!tab.path) return <NoFile />;
  const tabKey = index.toString();

  return (
    <Box
      display={isActive ? "block" : "none"}
      height="100%"
      id={index.toString()}
    >
      <Allotment>
        {renderContent(tab.path, tabKey, false)}
        {tab.splittedPath && (
          <Box pl={2} maxHeight="100%" h="full">
            {renderContent(tab.splittedPath, tabKey + "split", true)}
          </Box>
        )}
      </Allotment>
    </Box>
  );
};

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { showSidebar, tabs, activeTab } = useWorkspaceStore();
  const { widgetPanel } = useWidgetStore();
  const { compactMode } = useSettingsStore();
  const lengthTabs = Object.keys(tabs).length;

  return (
    <Flex w="full" pt={compactMode ? 0 : 9} h="full" px={2}>
      <PanelGroup
        id="sidebar"
        autoSaveId="example"
        direction="horizontal"
        style={{
          maxHeight: "100%",
          marginTop: compactMode ? 0 : "5px",
          paddingBottom: "5px",
          backgroundColor: "transparent",
          zIndex: 9,
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
          style={{ maxHeight: "100%", backgroundColor: "transparent" }}
        >
          <EditorWrapper>
            <>
              {lengthTabs > 0 ? (
                Object.keys(tabs).map((key, index) => {
                  const tab = tabs[parseInt(key)];
                  const isActive = Number(key) === activeTab;
                  return (
                    <TabContent
                      key={index}
                      tab={tab}
                      index={index}
                      isActive={isActive}
                    />
                  );
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
            <Panel id="widgetbar" order={3} minSize={12}>
              <WidgetBar />
            </Panel>
          </>
        )}
      </PanelGroup>
    </Flex>
  );
};

export default Index;

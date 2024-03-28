import { Flex } from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import { Excalidraw } from "@excalidraw/excalidraw"
import { useCallback, useEffect, useState } from "react"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types"
import { useWorkspace } from "contexts/WorkspaceContext"
import SaveButton from "./SaveButton"

const Index = ({ path, splitted }: { path: string, splitted?: boolean }) => {
  const { saveFile, readFile } = useWorkspace()
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors()
  const [data, setData] = useState(null)
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

  const text_color = getTextColor()

  const border_color = getBorderColor()

  const bg_color = getBackgroundColor()
  const lighter_bg_color =
    utils.getTextColor(bg_color) === "#fff"
      ? utils.getLighterColor("0.02", bg_color)
      : utils.getDarkerColor("0.02", bg_color)

  const UIOptions = {
    canvasActions: {
      loadScene: false,
      export: false,
      saveToActiveFile: false,
    },
  };

  const saveData = useCallback(async () => {
    const elements = excalidrawAPI?.getSceneElements()
    const theme = excalidrawAPI?.getAppState().theme
    const bg = excalidrawAPI?.getAppState().viewBackgroundColor
    const data = {
      elements,
      appState: {
        theme,
        viewBackgroundColor: bg
      }
    }
    await saveFile(data, path)
    excalidrawAPI?.setToast({
      message: "File saved",
      closable: true,
      duration: 2000,
    })
  }, [excalidrawAPI, path, saveFile])

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 's' ) {
        event.preventDefault();
        saveData()
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveData]); 

  useEffect(() => {
    const fetchDataAndUpdateScene = async () => {
      let file = null;
      try {
        file = await readFile(path);
      } catch (error) {
        console.error("Error reading file:", error);
        return;
      }
  
      if (!file || !file.elements) {
        const isDark = utils.getTextColor(bg_color) === "#fff";
        const initialData: any = {
          elements: [],
          appState: {
            theme: isDark ? "dark" : "light",
            viewBackgroundColor: "#ffffff"
          }
        };
        setData({
          ...initialData,
          scrollToContent: true
        });
        if (excalidrawAPI) {
          excalidrawAPI.updateScene(initialData);
        }
      } else {
        if (excalidrawAPI) {
          excalidrawAPI.updateScene(file);
        }
        setData({
          ...file,
          scrollToContent: true
        });
      }
    };

    const openedFile = {
      path,
      data: null,
    }
    utils.saveToRecentOpened(openedFile, splitted)
    fetchDataAndUpdateScene();
  }, [bg_color, excalidrawAPI, path, readFile, splitted]);

  return (
    <Flex
    color={text_color}
    w="full"
    h="full"
    border="1px"
    borderColor={border_color}
    rounded="md"
    maxHeight="100%"
    overflowX="hidden"
    bg={lighter_bg_color}
  >
    {
      data &&
      <Excalidraw
      renderTopRightUI={() => <SaveButton callback={saveData}/>}
      excalidrawAPI={(api)=> setExcalidrawAPI(api)}
      initialData={data}
      UIOptions={UIOptions as any}
    />
    }
   
    </Flex>
  )
}

export default Index
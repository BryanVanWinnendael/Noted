import { Box, Flex } from "@chakra-ui/react";
import { EDITOR_JS_TOOLS } from "./tools";
import { useWorkspace } from "contexts/WorkspaceContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import EditorCore from "@editorjs/editorjs";
import useColors from "hooks/useColors";
import { utils } from "utils/index";
import { useEditor } from "contexts/EditorContext";
import { useSlash } from "contexts/SlashContext";
import { useSettings } from "contexts/SettingsContext";
import TitleBar from "./TitleBar";

const Editor = ({
  splitted,
  path,
  tabKey,
}: {
  splitted?: boolean;
  path: string;
  tabKey: string;
}) => {
  const { setPosition, setSlashOpen, slashOpen } = useSlash();
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors();
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef<EditorCore | null>(null);
  const { saveFile, readFile, platform } = useWorkspace();
  const [loaded, setLoaded] = useState(false);
  const { setEditor, editor, setBlocks, setTime, setSplittedEditor } =
    useEditor();
  const { glassBackground, glassEnabled } = useSettings();
  const boxRef = useRef<HTMLDivElement>(null);

  const filename =
    platform === "win32"
      ? path.split("\\").pop()?.split(".noted")[0] || "Untitled"
      : path.split("/").pop()?.split(".noted")[0] || "Untitled";
  const workspace_path = localStorage.getItem("workspace_path");
  const homeName =
    platform === "win32"
      ? workspace_path?.split("\\").pop() + ".home"
      : workspace_path?.split("/").pop() + ".home";
  const isHomeFile = filename === homeName;

  const text_color = getTextColor();
  const border_color = getBorderColor();
  const bg_color = getBackgroundColor();
  const lighter_bg_color =
    utils.getTextColor(bg_color) === "#fff"
      ? utils.getLighterColor("0.02", bg_color)
      : utils.getDarkerColor("0.02", bg_color);

  const isGlassEnabled = glassEnabled && glassBackground.editor;

  const handleInitialize = useCallback(
    (instance: any) => {
      instance._editorJS.isReady
        .then(() => {
          editorCore.current = instance;
          if (splitted) setSplittedEditor(instance);
          else setEditor(instance);
          setLoaded(true);
        })
        .catch((err: any) => console.log("An error occured", err));
    },
    [setEditor, setSplittedEditor, splitted],
  );

  const saveToLocalStorage = useCallback(
    (data: any) => {
      utils.saveToRecentOpened(data, splitted);
    },
    [splitted],
  );

  const getData = useCallback(
    // used for the info widget
    async () => {
      if (!editorCore.current) return;
      const editorData = await editorCore.current.save();
      const blocks = editorData.blocks;
      setBlocks(blocks);
      const time = editorData.time || 0;
      setTime(time);
      saveToLocalStorage(editorData);
    },
    [saveToLocalStorage, setBlocks, setTime],
  );

  const clearEditor = useCallback(() => {
    try {
      if (editorCore.current) editorCore.current.clear();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const renderEditor = useCallback(
    async (jsonData: any) => {
      if (!editorCore.current) return;
      await editorCore.current.render(jsonData);
      await getData();
    },
    [getData],
  );

  const handleReadFile = useCallback(async () => {
    if (!editor || !loaded) return;
    try {
      const data = await readFile(path);
      if (data && data.blocks?.length !== 0) await renderEditor(data);
      else clearEditor();
    } catch (error) {
      clearEditor();
    }
  }, [editor, loaded, readFile, path, renderEditor, clearEditor]);

  const checkSlashCommand = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (event.key === "\\") {
      setSlashOpen(true);
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection) {
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setPosition({ x: rect.x, y: rect.y });
          } else {
            const boxRect = boxRef.current?.getBoundingClientRect();
            if (boxRect) {
              setPosition({ x: boxRect.left, y: boxRect.top });
            }
          }
        }
      }, 0);
    } else {
      if (slashOpen) setSlashOpen(false);
    }
    setTimeout(() => {
      handleSave();
    }, 100);
  };

  const handleSave = async () => {
    try {
      if (!editorCore.current) return;
      const savedData = await editorCore.current.save();
      let Spath;
      if (splitted) Spath = localStorage.getItem("splitted_active_file") || "";
      else Spath = localStorage.getItem("active_file") || "";
      await saveFile(savedData, Spath);
      await getData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleReadFile();
  }, [handleReadFile]);

  return (
    <Flex
      color={text_color}
      w="full"
      h="full"
      border="1px"
      borderColor={border_color}
      rounded="md"
      maxHeight="100%"
      className="glass"
      backdropFilter={`blur(100px)`}
      shadow="lg"
      flexDirection="column"
      bg={
        isGlassEnabled
          ? utils.getGlassBackground(lighter_bg_color)
          : lighter_bg_color
      }
      style={{
        backdropFilter: isGlassEnabled ? `blur(10px)` : "none", // Apply backdrop filter only when glass effect is enabled
      }}
      mb={2}
    >
     
      <TitleBar editor={editorCore} isHomeFile={isHomeFile} filename={filename} />
      <ReactEditorJS
        holder={"noted" + path + tabKey}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        placeholder="Write your note here..."
      >
        <Box
          overflowY="scroll"
          ref={boxRef}
          onKeyDown={checkSlashCommand}
          id={"noted" + path + tabKey}
          height="100%"
        ></Box>
      </ReactEditorJS>
    </Flex>
  );
};

export default Editor;

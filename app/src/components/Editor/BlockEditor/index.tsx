import { Box } from "@chakra-ui/react";
import { EDITOR_JS_TOOLS } from "./tools";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import EditorCore from "@editorjs/editorjs";
import { utils } from "utils/index";
import { useEditorStore } from "stores/EditorStore";
import { useSlashStore } from "stores/SlashStore";
import TitleBar from "../TitleBar";

const MarkdownEditor = ({
  splitted,
  path,
  tabKey,
}: {
  splitted?: boolean;
  path: string;
  tabKey: string;
}) => {
  const { setPosition, setSlashOpen, slashOpen } = useSlashStore();
  const { setEditor, editor, setBlocks, setTime, setSplittedEditor } =
    useEditorStore();
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef<EditorCore | null>(null);
  const { saveFile, readFile, platform } = useWorkspaceStore();
  const [loaded, setLoaded] = useState(false);
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
    <>
      <TitleBar
        editor={editorCore}
        isHomeFile={isHomeFile}
        filename={filename}
        path={path}
        type="block"
      />
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
    </>
  );
};

export default MarkdownEditor;

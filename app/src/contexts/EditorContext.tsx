import { EditorTypeContext } from "types";
import { createContext, useContext, useState } from "react";
import EditorJS from "@editorjs/editorjs";

const EditorContext = createContext<EditorTypeContext>({} as EditorTypeContext);

export function useEditor() {
  return useContext(EditorContext);
}

type Props = {
  children: React.ReactNode;
};

export const EditorProvider: React.FC<Props> = ({ children }: Props) => {
  const [editor, setEditor] = useState<EditorJS>({} as EditorJS);
  const [splittedEditor, setSplittedEditor] = useState<EditorJS>(
    {} as EditorJS,
  );
  const [blocks, setBlocks] = useState<any>([]);
  const [time, setTime] = useState<any>(0);

  const value: EditorTypeContext = {
    editor,
    setEditor,
    setBlocks,
    blocks,
    setTime,
    time,
    splittedEditor,
    setSplittedEditor,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

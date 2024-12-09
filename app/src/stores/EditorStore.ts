import { create } from "zustand";
import EditorJS from "@editorjs/editorjs";

type EditorStoreType = {
  editor: EditorJS | null;
  setEditor: (editor: EditorJS) => void;
  splittedEditor: EditorJS | null;
  setSplittedEditor: (editor: EditorJS) => void;
  blocks: any[];
  setBlocks: (blocks: any[]) => void;
  time: number;
  setTime: (time: number) => void;
};

export const useEditorStore = create<EditorStoreType>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
  splittedEditor: null,
  setSplittedEditor: (editor) => set({ splittedEditor: editor }),
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  time: 0,
  setTime: (time) => set({ time }),
}));

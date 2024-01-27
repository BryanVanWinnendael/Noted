import { EditorTypeContext } from "types"
import { createContext, useContext, useState } from "react"
import EditorJS from "@editorjs/editorjs"

const EditorContext = createContext<EditorTypeContext>({} as EditorTypeContext)

export function useEditor() {
  return useContext(EditorContext)
}

type Props = {
  children: React.ReactNode
}

export const EditorProvider: React.FC<Props> = ({ children }: Props) => {
  const [editor, setEditor] = useState<EditorJS>({} as EditorJS)
  const [info, setInfo] = useState<string>("")

  const value: EditorTypeContext = {
    editor,
    setEditor,
    setInfo,
    info,
  }

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

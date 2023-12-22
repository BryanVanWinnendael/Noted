import { EditorTypeContext } from "types"
import { createContext, useContext, useState } from "react"
import { EditorState } from "draft-js"

const EditorContext = createContext<EditorTypeContext>({} as EditorTypeContext)

export function useEditor(){
  return useContext(EditorContext)
}

type Props = {
  children: React.ReactNode
}

export const EditorProvider:React.FC<Props> =  ({ children }: Props) => {
  const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty())


  const value: EditorTypeContext = {
    editor,
    setEditor
  }


  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}


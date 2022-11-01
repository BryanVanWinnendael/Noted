import {
  useState,
  useEffect,
  useCallback,
  useRef
  } from "react"
  import { useFile } from "contexts/FileContext"
  import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
  import Editor from "@draft-js-plugins/editor"
  import Plugins from "plugins"
  import "draft-js/dist/Draft.css"
  import { mdToDraftjs, draftjsToMd } from "draftjs-md-converter"
  import { blockRenderMap } from "styling/MDStyle"
  import { FileTypeContext } from "types/index"
  import UseShortcuts from "hooks/UseShortcuts"
  import AddImage from "plugins/AddImage"
  import SideToolbar from "components/side-toolbar"
  import { mentions, MentionSuggestionsBlock } from "plugins/Mentions"
  import { defaultSuggestionsFilter } from "@draft-js-plugins/mention"

  const MdEditor = () => {
    const editorRef = useRef<any>(null)
    const { file_content, setFile_content, file_path, setSaved, setNew_file, new_file, setInlineToolbar, inlineToolbar } = useFile() as FileTypeContext
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [new_file_path, setNew_file_path] = useState<string | null>(null)
    const { KeyCommands, HandleKeys } = UseShortcuts()
    const { plugins, InlineToolbar, MentionSuggestions } = Plugins()
    const [openImage, setOpenImage] = useState<boolean>(false)
  
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState(mentions)
  
    const onOpenChange = useCallback((_open: boolean) => {
      setOpen(_open)
    }, [])
  
    const onSearchChange = useCallback(({ value }: { value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentions))
    }, [])
  
    const handleChange = (editorState: EditorState) => {
      const raw: any = convertToRaw(editorState.getCurrentContent())
      const md = draftjsToMd(raw)
  
      if (md !== file_content) {
        setSaved(false)
      }
  
      setFile_content(md)
      setEditorState(editorState)
    }
  
    useEffect(() => {
      if (new_file_path !== file_path) {
        setNew_file_path(file_path)
        const rawData = mdToDraftjs(file_content)
        const contentState = convertFromRaw(rawData)
        setEditorState(() => EditorState.createWithContent(contentState))
      }
      if (new_file) {
        setEditorState(EditorState.createEmpty())
        setNew_file(false)
      }
      localStorage.getItem("inlinetoolbar") === "false" ? setInlineToolbar(false) : setInlineToolbar(true)
    }, [file_content, inlineToolbar])
  
    return (
      <div className="mt-20 max-w-md w-full mr-5 h-full">
        <div>
          <Editor
            ref={editorRef}
            handleKeyCommand={ HandleKeys }
            keyBindingFn={ KeyCommands }
            blockRenderMap={ blockRenderMap }
            editorState={ editorState }
            onChange={ handleChange }
            placeholder="Type here Markdown text..."
            plugins={ plugins }
          />
          
          {inlineToolbar && <InlineToolbar />}

          <SideToolbar setOpenImage={setOpenImage} editorState={editorState} setEditorState={setEditorState}/>
  
          {openImage && (
            <AddImage setOpenImage={setOpenImage} openImage={openImage} editorState={editorState} setEditorState={setEditorState} />
          )}
  
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
            entryComponent={MentionSuggestionsBlock}
          />
        </div>
      </div>
    )
  }
  
  export default MdEditor
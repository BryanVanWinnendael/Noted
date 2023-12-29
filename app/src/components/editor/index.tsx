import {
  useState,
  useEffect,
  useCallback,
  useRef
  } from "react"
  import { useFile } from "contexts/FileContext"
  import { useSettings } from "contexts/SettingsContext"
  import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
  import Editor from "@draft-js-plugins/editor"
  import Plugins from "plugins"
  import "draft-js/dist/Draft.css"
  import { mdToDraftjs, draftjsToMd } from "draftjs-md-converter"
  import { blockRenderMap } from "styling/MDStyle"
  import UseShortcuts from "hooks/UseShortcuts"
  import AddImage from "plugins/AddImage"
  import SideToolbar from "components/side-toolbar"
  import { mentions, MentionSuggestionsBlock } from "plugins/Mentions"
  import { defaultSuggestionsFilter } from "@draft-js-plugins/mention"
  import { useEditor } from "contexts/EditorContext"

  const MdEditor = () => {
    const editorRef = useRef<any>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const { file_content, setFile_content, file_path, setSaved, setNew_file, new_file, saved, currentTab } = useFile()
    const { inlineToolbar } = useSettings()
    const { editor, setEditor} = useEditor()
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
      if (!loaded) return // handleChange can run before setEditorState

      const raw: any = convertToRaw(editorState.getCurrentContent())
      const md = draftjsToMd(raw)
  
      if (md !== file_content[currentTab]) {
        const newSaved = {...saved}
        newSaved[currentTab] = false
        setSaved(newSaved)
      }

      const newFile_content = {...file_content}
      newFile_content[currentTab] = md

      setFile_content(newFile_content)
      setEditor(editorState)
    }
  
    useEffect(() => {
      try{
        if (new_file_path !== file_path[currentTab]) {
          setNew_file_path(file_path[currentTab])
          const rawData = mdToDraftjs(file_content[currentTab])
          const contentState = convertFromRaw(rawData)
          setEditor(EditorState.createWithContent(contentState))
        } if (new_file[currentTab]) {
          setEditor(EditorState.createEmpty())
          const newNew_file = {...new_file}
          newNew_file[currentTab] = false
          setNew_file(newNew_file)
        }
      } catch (e) {
        console.log(e)
      }
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file_content, currentTab, file_content[currentTab]])

    useEffect(() => {
      try{
        const rawData = mdToDraftjs(file_content[currentTab])
        const contentState = convertFromRaw(rawData)
        setEditor(EditorState.createWithContent(contentState))
        setLoaded(true)
      } catch (e) {
        console.log(e)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab])
  
    return (
      <div className="max-w-md w-full mr-5 h-full">
        <div>
          <Editor
            ref={editorRef}
            handleKeyCommand={ HandleKeys }
            keyBindingFn={ KeyCommands }
            blockRenderMap={ blockRenderMap }
            editorState={ editor }
            onChange={ handleChange }
            placeholder="Type here Markdown text..."
            plugins={ plugins }
          />
          
          {inlineToolbar && <InlineToolbar />}

          <SideToolbar setOpenImage={setOpenImage}/>
  
          {openImage && <AddImage setOpenImage={setOpenImage} openImage={openImage}/>}
  
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
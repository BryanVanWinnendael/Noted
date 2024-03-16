import { Box, Flex } from "@chakra-ui/react"
import { EDITOR_JS_TOOLS } from "./tools"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useCallback, useEffect, useRef, useState } from "react"
import { createReactEditorJS } from "react-editor-js"
import EditorCore from "@editorjs/editorjs"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import { useEditor } from "contexts/EditorContext"
import { useSlash } from "contexts/SlashContext"

const Editor = ({ splitted, path }: { splitted?: boolean; path: string }) => {
  const { setPosition, setSlashOpen, slashOpen } = useSlash()
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors()
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef<EditorCore | null>(null)
  const { saveFile, readFile } = useWorkspace()
  const [loaded, setLoaded] = useState(false)
  const { setEditor, editor, setBlocks, setTime, setSplittedEditor } =
    useEditor()
  const boxRef = useRef<HTMLDivElement>(null)

  const text_color = getTextColor()

  const border_color = getBorderColor()

  const bg_color = getBackgroundColor()
  const lighter_bg_color =
    utils.getTextColor(bg_color) === "#fff"
      ? utils.getLighterColor("0.02", bg_color)
      : utils.getDarkerColor("0.02", bg_color)

  const handleInitialize = useCallback(
    (instance: any) => {
      instance._editorJS.isReady
        .then(() => {
          editorCore.current = instance
          if (splitted) setSplittedEditor(instance)
          else setEditor(instance)
          setLoaded(true)
        })
        .catch((err: any) => console.log("An error occured", err))
    },
    [setEditor, setSplittedEditor, splitted],
  )

  const saveToLocalStorage = useCallback(
    (data: any) => {
      utils.saveToRecentOpened(data, splitted)
    },
    [splitted],
  )

  const getData = useCallback(
    // used for the info widget
    async () => {
      if (!editorCore.current) return
      const editorData = await editorCore.current.save()
      const blocks = editorData.blocks
      setBlocks(blocks)
      const time = editorData.time || 0
      setTime(time)
      saveToLocalStorage(editorData)
    },
    [saveToLocalStorage, setBlocks, setTime],
  )

  const clearEditor = useCallback(() => {
    try {
      if (editorCore.current) editorCore.current.clear()
    } catch (e) {
      console.error(e)
    }
  }, [])

  const renderEditor = useCallback(
    async (jsonData: any) => {
      if (!editorCore.current) return
      await editorCore.current.render(jsonData)
      await getData()
    },
    [getData],
  )

  const handleReadFile = useCallback(async () => {
    if (!editor || !loaded) return
    try {
      const data = await readFile(path)

      if (data && data.blocks?.length !== 0) await renderEditor(data)
      else clearEditor()
    } catch (error) {
      clearEditor()
    }
  }, [editor, loaded, readFile, path, renderEditor, clearEditor])

  const checkSlashCommand = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (event.key === "\\") {
      setSlashOpen(true)
      setTimeout(() => {
        const selection = window.getSelection()
        if (selection) {
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            const rect = range.getBoundingClientRect()
            setPosition({ x: rect.x, y: rect.y })
          } else {
            const boxRect = boxRef.current?.getBoundingClientRect()
            if (boxRect) {
              setPosition({ x: boxRect.left, y: boxRect.top })
            }
          }
        }
      }, 0)
    } else {
      if (slashOpen) setSlashOpen(false)
    }
    setTimeout(() => {
      handleSave()
    }, 100)
  }

  const handleSave = async () => {
    try {
      if (!editorCore.current) return
      const savedData = await editorCore.current.save()
      let Spath
      if (splitted) Spath = localStorage.getItem("splitted_active_file") || ""
      else Spath = localStorage.getItem("active_file") || ""
      await saveFile(savedData, Spath)
      await getData()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handleReadFile()
  }, [handleReadFile])

  return (
    <Flex
      ml={splitted ? 2 : 0}
      color={text_color}
      w="full"
      h="full"
      border="1px"
      overflowY="scroll"
      borderColor={border_color}
      rounded="md"
      maxHeight="100%"
      overflowX="hidden"
      bg={lighter_bg_color}
      mb={2}
    >
      <Box maxH="100%" w="full" h="full" m={0} pl={2}>
        <ReactEditorJS
          holder={"noted" + path}
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
        >
          <Box
            ref={boxRef}
            onKeyDown={checkSlashCommand}
            id={"noted" + path}
            overflowY="scroll"
            height="100%"
          ></Box>
        </ReactEditorJS>
      </Box>
    </Flex>
  )
}

export default Editor

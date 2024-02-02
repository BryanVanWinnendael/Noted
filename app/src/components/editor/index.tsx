import { Box, Flex, Text } from "@chakra-ui/react"
import { EDITOR_JS_TOOLS } from "./tools"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useCallback, useEffect, useRef, useState } from "react"
import { createReactEditorJS } from "react-editor-js"
import EditorCore from "@editorjs/editorjs"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import { useEditor } from "contexts/EditorContext"

const Editor = () => {
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors()
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef<EditorCore | null>(null)
  const { saveFile, activeTab, activeFile } = useWorkspace()
  const [loaded, setLoaded] = useState(false)
  const { setEditor, editor, setBlocks, setTime } = useEditor()

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
          setEditor(instance)
          setLoaded(true)
        })
        .catch((err: any) => console.log("An error occured", err))
    },
    [setEditor],
  )

  const getOpenedFile = (path: string, openFiles: any[]) => {
    const openedFile = openFiles.find((file) => file.path === path)
    return openedFile
  }

  const saveToLocalStorage = useCallback(async (data: any) => {
    const path = localStorage.getItem("active_file") || ""
    const openArray = localStorage.getItem("open_files")
    const openFiles = openArray ? JSON.parse(openArray) : []
    const existingFile = getOpenedFile(path, openFiles)

    if (existingFile) {
      existingFile.data = data
      const index = openFiles.findIndex((file: any) => file.path === path)
      openFiles.splice(index, 1)
      openFiles.unshift(existingFile)
      localStorage.setItem("open_files", JSON.stringify(openFiles))
    } else {
      if (openFiles.length === 5) openFiles.shift()
      // push it to the front of the array
      openFiles.unshift({ path, data })
      localStorage.setItem("open_files", JSON.stringify(openFiles))
    }
  }, [])

  const getData = useCallback(
    async (editor: any) => {
      const editorData = await editor.save()
      const blocks = editorData.blocks
      setBlocks(blocks)
      const time = editorData.time || 0
      setTime(time)
      saveToLocalStorage(editorData)
    },
    [saveToLocalStorage, setBlocks, setTime],
  )

  const handleReadFile = useCallback(async () => {
    if (!editor || !loaded || !activeFile) return
    try {
      const jsonData: any = activeFile.data
      if (jsonData) {
        if (jsonData.blocks?.length !== 0) {
          await editor.render(jsonData)
          await getData(editor)
        } else editor.clear()
      } else editor.clear()
    } catch (err) {
      editor.clear()
    }
  }, [editor, loaded, activeFile, getData])

  const handleSave = useCallback(async () => {
    if (!activeFile || !editorCore.current) return
    const savedData = await editorCore.current.save()
    const path = localStorage.getItem("active_file") || ""
    await saveFile(savedData, path)
    await getData(editorCore.current)
  }, [activeFile, getData, saveFile])

  useEffect(() => {
    handleReadFile()
  }, [handleReadFile, activeTab])

  return (
    <Flex
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
      {activeFile ? (
        <Box maxH="100%" w="full" h="full" m={0} pl={2}>
          <ReactEditorJS
            holder="noted"
            onChange={handleSave}
            onInitialize={handleInitialize}
            tools={EDITOR_JS_TOOLS}
          >
            <Box id="noted" overflowY="scroll" height="100%"></Box>
          </ReactEditorJS>
        </Box>
      ) : (
        <Text color={text_color} fontSize="xl" fontWeight="bold" m="auto">
          No file selected
        </Text>
      )}
    </Flex>
  )
}

export default Editor

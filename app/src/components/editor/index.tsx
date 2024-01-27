import { Box, Flex, Text } from "@chakra-ui/react"
import { EDITOR_JS_TOOLS } from "./tools"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useCallback, useEffect, useRef, useState } from "react"
import { createReactEditorJS } from "react-editor-js"
import EditorCore from "@editorjs/editorjs"
import useColors from "hooks/useColors"
import { utils } from "utils/index"

const Editor = () => {
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors()
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef<EditorCore | null>(null)
  const { saveFile, activeTab, activeFile } = useWorkspace()
  const [loaded, setLoaded] = useState(false)
  const [editor, setEditor] = useState<any>(null)

  const text_color = getTextColor()

  const border_color = getBorderColor()

  const bg_color = getBackgroundColor()
  const lighter_bg_color = utils.getTextColor(bg_color) === "#fff" 
    ? utils.getLighterColor("0.02", bg_color) 
      : utils.getDarkerColor("0.02", bg_color)

  const handleInitialize = useCallback((instance: any) => {
    instance._editorJS.isReady
      .then(() => {
        editorCore.current = instance
        setEditor(instance)
        setLoaded(true)
      })
      .catch((err: any) => console.log("An error occured", err))
  }, [])

  const handleReadFile = useCallback(async () => {
    if (!editor || !loaded || !activeFile) return
    try {
      const jsonData: any = activeFile.data
      if (jsonData) {
        if (jsonData.blocks?.length !== 0) {
          await editor.render(jsonData)
        } else editor.clear()
      } else editor.clear()
    } catch (err) {
      editor.clear()
    }
  }, [editor, loaded, activeFile])

  const handleSave = useCallback(async () => {
    if (!activeFile || !editorCore.current) return
    const savedData = await editorCore.current.save()
    const path = localStorage.getItem("active_file") || ""
    await saveFile(savedData, path)
  }, [activeFile, saveFile])

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

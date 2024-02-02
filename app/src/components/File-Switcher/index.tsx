import { Box, Flex } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useCallback, useEffect, useState } from "react"
import { utils } from "utils/index"
import FileCard from "./FileCard"

const Index = () => {
  const { setShowSwitcher, setActiveFolder, openFile } = useWorkspace()
  const { getSecondaryBackgroundColor, getTextColor } = useColors()
  const [selectedPane, setSelectedPane] = useState<number>(0)
  const openFiles: any[] = localStorage.getItem("open_files")
    ? JSON.parse(localStorage.getItem("open_files")!)
    : []

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const selectPane = useCallback(
    (path: string) => {
      const folderPath = path.split("\\")
      folderPath.pop()
      setActiveFolder(folderPath.join("\\"))
      openFile(path)
    },
    [openFile, setActiveFolder],
  )

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        const openFilesStorage = localStorage.getItem("open_files")
        if (openFilesStorage) {
          const files = JSON.parse(openFilesStorage)
          const selectedPath = files[selectedPane].path
          selectPane(selectedPath)
          setShowSwitcher(false)
        }
      }
    }

    const switchPane = (event: KeyboardEvent) => {
      if (event.key === " ") {
        const openFilesStorage = localStorage.getItem("open_files")
        if (openFilesStorage) {
          const files = JSON.parse(openFilesStorage)
          if (selectedPane === files.length - 1) {
            setSelectedPane(0)
          } else {
            setSelectedPane(selectedPane + 1)
          }
        }
      }
    }

    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("keydown", switchPane)

    return () => {
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("keydown", switchPane)
    }
  }, [selectPane, selectedPane, setShowSwitcher])

  return (
    <>
      {openFiles.length > 0 && (
        <Flex
          onClick={() => setShowSwitcher(false)}
          justifyContent="center"
          alignItems="center"
          w="100vw"
          h="100vh"
          position="fixed"
          zIndex={999999999999}
          top={0}
        >
          <Flex
            gap={1}
            bg={secondary_background_color}
            rounded="3xl"
            className="sm:p-5 p-2"
          >
            {openFiles.map((file: any, index: number) => (
              <Box
                w="full"
                onClick={() => selectPane(file.path)}
                color={text_color}
                key={index}
                rounded="2xl"
                cursor="pointer"
                _hover={{ bg: bg_color }}
                className="md:pb-[26px] pb-[23px] md:px-[13px] px-[8px] md:pt-[13px] pt-[8px]"
                bg={selectedPane === index ? bg_color : ""}
                h="full"
              >
                <FileCard data={file.data} path={file.path} index={index} />
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Index

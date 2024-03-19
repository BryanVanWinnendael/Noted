import { WorkspaceType } from "types"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react"
import { useCallback } from "react"
import useColors from "hooks/useColors"
import { useSettings } from "contexts/SettingsContext"
import CompactNavbar from "components/Nav-Bar/CompactNavbar"
import Actions from "./Actions"
import FolderButton from "./FolderButton"
import FileButton from "./FileButton"

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { getTextColor } = useColors()
  const { compactMode } = useSettings()

  const text_color = getTextColor()

  const makeTree = (folder: WorkspaceType[]) => {
    if (!folder) {
      return <></>
    }

    return folder.map((item) => {
      if (item.type === "folder" && item.items) {
        return (
          <AccordionItem key={item.name} border="none" w="full">
            <FolderButton path={item.path} name={item.name} />
            <AccordionPanel pb={1} w="full">
              {makeTree(item.items)}
            </AccordionPanel>
          </AccordionItem>
        )
      } else {
        return <FileButton key={item.name} path={item.path} name={item.name} />
      }
    })
  }

  const filterFilesWithNoted = useCallback(
    (items: WorkspaceType[] | undefined): WorkspaceType[] | undefined => {
      if (!items) {
        return undefined
      }

      return items
        .map((item) => {
          if (item.type === "folder" && item.items) {
            return { ...item, items: filterFilesWithNoted(item.items) }
          }
          return item
        })
    },
    [],
  )

  return (
    <Box w="full" h="full">
      {compactMode && <CompactNavbar />}
      <Actions />
      <Text pl={4} fontWeight="bold" fontSize="sm" color={text_color} mb={2}>
        {workspace.name}
      </Text>
      {workspace.items && (
        <Accordion
          allowMultiple
          defaultIndex={[0]}
          w="full"
          overflowY="hidden"
          _hover={{ overflowY: "scroll" }}
          h="full"
          pb={24}
        >
          {makeTree(workspace.items)}
        </Accordion>
      )}
    </Box>
  )
}

export default Index

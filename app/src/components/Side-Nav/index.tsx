import { WorkspaceType } from "types"
import {
  Box,
  Text,
} from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { useSettings } from "contexts/SettingsContext"
import CompactNavbar from "components/Nav-Bar/CompactNavbar"
import Actions from "./Actions"
import TreeView from "./TreeView"


const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { getTextColor } = useColors()
  const { compactMode } = useSettings()

  const text_color = getTextColor()

  const sortedItems = workspace.items?.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1
    if (a.type === "file" && b.type === "folder") return 1
    return 0
  })


  return (
    <Box w="full" h="full">
      {compactMode && <CompactNavbar />}
      <Actions />
      <Text pl={4} fontWeight="bold" fontSize="sm" color={text_color} mb={2}>
        {workspace.name}
      </Text>
      {
        sortedItems && (
          <TreeView items={sortedItems} />
        )
      }
    </Box>
  )
}

export default Index

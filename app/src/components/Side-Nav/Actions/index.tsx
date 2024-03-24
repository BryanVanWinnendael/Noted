import { Center } from "@chakra-ui/react"
import AddFile from "./AddFile"
import AddFolder from "./AddFolder"
import AddExcalidraw from "./AddExcalidraw"
import useColors from "hooks/useColors"
import { utils } from "utils"

const Index = () => {
  const { getSecondaryBackgroundColor } = useColors()

  const background_color = getSecondaryBackgroundColor()
  const transparent_bg_color = utils.getTransparent(0.8, background_color)
  
  return (
    <Center p={1} bg={transparent_bg_color} rounded="md" h="fit-content">
      <AddExcalidraw />
      <AddFile />
      <AddFolder />
    </Center>
  )
}

export default Index

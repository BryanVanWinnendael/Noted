import { Center } from "@chakra-ui/react"
import AddFile from "./AddFile"
import AddFolder from "./AddFolder"
import AddExcalidraw from "./AddExcalidraw"

const Index = () => {
  return (
    <Center p={1}>
      <AddExcalidraw />
      <AddFile />
      <AddFolder />
    </Center>
  )
}

export default Index

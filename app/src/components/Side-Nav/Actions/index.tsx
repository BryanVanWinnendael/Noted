import { Center } from "@chakra-ui/react"
import AddFile from "./AddFile"
import AddFolder from "./AddFolder"

const Index = () => {
  return (
    <Center p={1}>
      <AddFile />
      <AddFolder />
    </Center>
  )
}

export default Index

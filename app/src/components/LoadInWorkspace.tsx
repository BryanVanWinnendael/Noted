import { Text, Button, Center, Stack } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"

const LoadInWorkspace = () => {
  const { openWorkspace } = useWorkspace()

  return (
    <Center h="full" w="full">
      <Stack>
        <Text>No workspace is opened</Text>
        <Button onClick={openWorkspace}>Load in Workspace</Button>
      </Stack>
    </Center>
  )
}

export default LoadInWorkspace

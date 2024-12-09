import { Text, Button, Center, Stack } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";

const LoadInWorkspace = () => {
  const { openWorkspace } = useWorkspaceStore();

  return (
    <Center h="full" w="full">
      <Stack>
        <Text>No workspace is opened</Text>
        <Button onClick={openWorkspace}>Load in Workspace</Button>
      </Stack>
    </Center>
  );
};

export default LoadInWorkspace;

import { Box, Flex, Text } from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { useState, useRef } from "react";

const DragAndDrop = ({ children }: { children: JSX.Element }) => {
  const [dragging, setDragging] = useState(false);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);
  const { backgroundColor } = useColors();
  const { openRecentWorkspace } = useWorkspaceStore();

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const drop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const path = files[0].path;
      openRecentWorkspace(path);
    }
    setDragging(false);
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;

    if (!currentTarget.contains(e.relatedTarget as Node)) {
      setDragging(false);
    }
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  return (
    <Box
      w="full"
      h="100vh"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDrop={drop}
      onDragLeave={dragLeave}
      ref={(node) => (dragContainerRef.current = node)}
    >
      {dragging && (
        <Flex
          position="fixed"
          top={0}
          w="100vw"
          h="100vh"
          bg={backgroundColor}
          opacity={0.7}
          zIndex={99999}
          justifyContent="center"
          alignItems="center"
        >
          <Text opacity={1}>Drop your folder here</Text>
        </Flex>
      )}
      {children}
    </Box>
  );
};

export default DragAndDrop;

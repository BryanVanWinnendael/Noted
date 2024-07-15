import { Center } from "@chakra-ui/react";
import AddFile from "./AddFile";
import AddFolder from "./AddFolder";
import AddExcalidraw from "./AddExcalidraw";
import useColors from "hooks/useColors";
import { useSettings } from "contexts/SettingsContext";
import WorkspaceFile from "./WorkspaceFile";

const Index = () => {
  const { secondaryBackgroundColor, getTransparent } = useColors();
  const { actionbarOpacity } = useSettings();

  const transparent_bg_color = getTransparent(
    actionbarOpacity,
    secondaryBackgroundColor,
  );

  return (
    <Center p={1} bg={transparent_bg_color} rounded="md" h="fit-content">
      <WorkspaceFile />
      <AddFile />
      <AddExcalidraw />
      <AddFolder />
    </Center>
  );
};

export default Index;

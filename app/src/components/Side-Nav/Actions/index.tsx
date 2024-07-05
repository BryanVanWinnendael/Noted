import { Center } from "@chakra-ui/react";
import AddFile from "./AddFile";
import AddFolder from "./AddFolder";
import AddExcalidraw from "./AddExcalidraw";
import useColors from "hooks/useColors";
import { utils } from "utils";
import { useSettings } from "contexts/SettingsContext";
import WorkspaceFile from "./WorkspaceFile";

const Index = () => {
  const { getSecondaryBackgroundColor } = useColors();
  const { actionbarOpacity } = useSettings();

  const background_color = getSecondaryBackgroundColor();
  const transparent_bg_color = utils.getTransparent(
    actionbarOpacity,
    background_color,
  );

  return (
    <Center p={1} bg={transparent_bg_color} rounded="md" h="fit-content">
      <WorkspaceFile />
      <AddExcalidraw />
      <AddFile />
      <AddFolder />
    </Center>
  );
};

export default Index;

import { Divider, MenuList } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import Delete from "./Delete";
import Rename from "./Rename";
import { ContextMenu } from "types/index";
import AddFile from "./AddFile";
import AddFolder from "./AddFolder";
import OpenFIleInTab from "./OpenFileInTab";
import SplitFile from "./SplitFile";
import AddExcalidraw from "./AddExcalidraw";

const Index = ({ path, name, type }: ContextMenu) => {
  const { borderColor, backgroundColorLighter, getGlassBackground } =
    useColors();
  const { glassBackground, glassEnabled } = useSettingsStore();

  const isGlassEnabled = glassEnabled && glassBackground.contextMenu;

  return (
    <MenuList
      w="fit-content"
      className="glass"
      border="1px"
      borderColor={borderColor}
      bg={
        isGlassEnabled
          ? getGlassBackground(backgroundColorLighter)
          : backgroundColorLighter
      }
      rounded="md"
      shadow="none"
      zIndex={999999999999}
      p={1}
    >
      <AddFile path={path} name={name} type={type} />
      <AddExcalidraw path={path} name={name} type={type} />
      <AddFolder path={path} name={name} type={type} />
      <Divider />

      {type === "file" && (
        <>
          <OpenFIleInTab path={path} name={name} type={type} />
          <SplitFile path={path} name={name} type={type} />
          <Divider />
        </>
      )}

      <Rename path={path} name={name} type={type} />
      <Delete path={path} name={name} type={type} />
    </MenuList>
  );
};

export default Index;

import { Flex, Grid, Text } from "@chakra-ui/react";
import CreateSite from "components/Editor/CreateSite";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import EditorJS from "@editorjs/editorjs";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { Editor } from "@tiptap/react";

const TitleBar = ({
  isHomeFile,
  filename,
  editor,
  path,
  type,
}: {
  isHomeFile: boolean;
  filename: string;
  editor: React.MutableRefObject<EditorJS | null> | Editor | null;
  path: string;
  type: "block" | "markdown";
}) => {
  const { editorTitle } = useSettingsStore();
  const { textColor, borderColor } = useColors();
  const { user } = useWorkspaceStore();

  return editorTitle ? (
    <Grid
      templateColumns="repeat(3, 1fr)"
      p={1}
      w="full"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Text></Text>
      <Text
        opacity={0.6}
        color={textColor}
        textAlign="center"
        pl="4rem"
        fontSize="md"
      >
        {isHomeFile ? "Home" : filename}
      </Text>
      <Flex alignItems="center" justifyContent="flex-end" mr={2}>
        {user && <CreateSite editor={editor} path={path} type={type} />}
      </Flex>
    </Grid>
  ) : (
    <Flex alignItems="center" justifyContent="flex-end" m={2}>
      {user && <CreateSite editor={editor} path={path} type={type} />}
    </Flex>
  );
};

export default TitleBar;

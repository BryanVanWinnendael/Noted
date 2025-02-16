import { Flex } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useSettingsStore } from "stores/SettingsStore";
import MarkdownEditor from "./MarkdownEditor";
import BlockEditor from "./BlockEditor";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { useEffect, useState } from "react";

const Editor = ({
  splitted,
  path,
  tabKey,
}: {
  splitted?: boolean;
  path: string;
  tabKey: string;
}) => {
  const [isBlockFile, setIsBlockFile] = useState(false);
  const { textColor, borderColor, backgroundColor, getGlassBackground } =
    useColors();
  const { glassBackground, glassEnabled, markdown } = useSettingsStore();
  const { readFile } = useWorkspaceStore();

  const isGlassEnabled = glassEnabled && glassBackground.editor;

  useEffect(() => {
    const isBlock = async () => {
      const content = await readFile(path);
      console.log(typeof content === "object");
      if (content) {
        if (typeof content === "object") {
          return setIsBlockFile(true);
        } else {
          return setIsBlockFile(false);
        }
      }
      setIsBlockFile(!markdown);
    };

    isBlock();
  }, [path, readFile, markdown]);

  return (
    <Flex
      color={textColor}
      w="full"
      h="full"
      border="1px"
      borderColor={borderColor}
      rounded="md"
      maxHeight="100%"
      className="glass"
      backdropFilter={`blur(100px)`}
      shadow="lg"
      flexDirection="column"
      bg={
        isGlassEnabled ? getGlassBackground(backgroundColor) : backgroundColor
      }
      style={{
        backdropFilter: isGlassEnabled ? `blur(10px)` : "none", // Apply backdrop filter only when glass effect is enabled
      }}
      mb={2}
    >
      {isBlockFile && path ? (
        <BlockEditor path={path} splitted={splitted} tabKey={tabKey} />
      ) : (
        <MarkdownEditor path={path} />
      )}
    </Flex>
  );
};

export default Editor;

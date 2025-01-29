import { Box } from "@chakra-ui/react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "components/Editor/BlockEditor/tools";
import EditorWrapper from "styling/EditorWrapper";
import useColors from "hooks/useColors";
import { OutputData } from "@editorjs/editorjs";
import clone from "lodash/clone";

const SmallEditor = ({ data, index }: { data: OutputData; index: number }) => {
  const ReactEditorJS = createReactEditorJS();
  const { backgroundColorLighter } = useColors();

  const toolsWithoutAudioPlayer = clone(EDITOR_JS_TOOLS);
  delete toolsWithoutAudioPlayer.code;
  delete toolsWithoutAudioPlayer.audioPlayer;

  return (
    <EditorWrapper>
      <Box
        h="100%"
        w="100%"
        userSelect="none"
        fontSize="5px"
        css={{
          "h1, h2": {
            fontSize: "8px",
          },
          "h3, h4": {
            fontSize: "6px",
          },
          "h5, h6": {
            fontSize: "5px",
          },
          ".css-1ekpu99, .ce-block__content": {
            margin: "0px !important",
          },
          ".codex-editor__redactor": {
            margin: "4px",
          },
          ".ce-delimiter:before, .codeflask__flatten, .codeflask__lines__line ":
            {
              fontSize: "5px",
            },
          ".codeflask__lines, .codeflask__flatten": {
            lineHeight: "5px",
          },
          ".editorjs-codeFlask_Wrapper": {
            height: "100%",
          },
          ".cdx-checklist__item-checkbox svg, .cdx-checklist__item-checkbox-check":
            {
              height: "5px",
              width: "5px",
            },
          ".cdx-checklist__item-checkbox": {
            marginTop: "0px",
            height: "5px",
            width: "5px",
          },
          ".ce-stub": {
            display: "none",
          },
          ".tc-table": {
            fontSize: "5px",
          },
          ".tc-cell": {
            padding: "0px",
          },
          ".cdx-marker": {
            padding: "0px",
          },
        }}
      >
        <ReactEditorJS
          holder={"smallEditor" + index}
          defaultValue={data}
          tools={toolsWithoutAudioPlayer}
          inlineToolbar={false}
          hideToolbar={true}
          readOnly={true}
        >
          <Box
            rounded="md"
            bg={backgroundColorLighter}
            id={"smallEditor" + index}
            overflowY="hidden"
            h="100%"
          ></Box>
        </ReactEditorJS>
      </Box>
    </EditorWrapper>
  );
};

export default SmallEditor;

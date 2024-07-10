import EditorWrapper from "@lib/styling/EditorWrapper";
import { EDITOR_JS_TOOLS } from "@lib/tools";
import EditorJS from '@editorjs/editorjs';
import { useEffect } from "react";

const Editor = ({ data, style }: any) => {

  useEffect(() => {
    const editor = new EditorJS({
      holder: "noted",
      data: JSON.parse(data),
      tools: EDITOR_JS_TOOLS,
    });

    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  },[])

  return (
    <EditorWrapper style={JSON.parse(style)}>
      <div id={"noted"}></div>
    </EditorWrapper>
  );
};

export default Editor;

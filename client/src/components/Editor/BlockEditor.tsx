import { EDITOR_JS_TOOLS } from "@lib/tools";
import EditorJS from "@editorjs/editorjs";
import { useEffect } from "react";

const BlockEditor = ({ data }: any) => {
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
  }, []);
  console.log(typeof data);
  return <div id={"noted"}></div>;
};

export default BlockEditor;

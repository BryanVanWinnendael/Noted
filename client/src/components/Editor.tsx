import EditorWrapper from "@lib/styling/EditorWrapper";
import { EDITOR_JS_TOOLS } from "@lib/tools";
import { createReactEditorJS } from "react-editor-js";

const Editor = ({ data, style }: any) => {
  const ReactEditorJS = createReactEditorJS();

  return (
    <EditorWrapper style={JSON.parse(style)}>
      <ReactEditorJS
        holder={"noted"}
        placeholder="Write your note here..."
        defaultValue={JSON.parse(data)}
        tools={EDITOR_JS_TOOLS}
      >
        <div id={"noted"}></div>
      </ReactEditorJS>
    </EditorWrapper>
  );
};

export default Editor;

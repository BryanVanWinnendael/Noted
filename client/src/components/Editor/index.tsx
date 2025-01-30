import EditorWrapper from "@lib/styling/EditorWrapper";
import { useEffect, useState } from "react";
import BlockEditor from "./BlockEditor";
import MarkdownEditor from "./MarkdownEditor";

const Editor = ({ data, style }: any) => {
  const [isBlockFile, setIsBlockFile] = useState(false);

  useEffect(() => {
    const isBlock = async () => {
      try {
        JSON.parse(data);
        setIsBlockFile(true);
      } catch (_error) {
        setIsBlockFile(false);
      }
    };

    isBlock();
  }, []);

  return (
    <EditorWrapper style={JSON.parse(style)}>
      {isBlockFile ? (
        <BlockEditor data={data} />
      ) : (
        <MarkdownEditor data={data} />
      )}
    </EditorWrapper>
  );
};

export default Editor;

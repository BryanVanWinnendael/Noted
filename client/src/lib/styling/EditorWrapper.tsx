import type { NoteStyle } from "@lib/types";
import BlockStyling from "./BlockStyling";
import MakdownStyling from "./MarkdownStyling";
import "./fonts.css";

const EditorWrapper = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: NoteStyle;
}) => {
  const backgroundColor = style.backgroundColor;
  const textColor = style.textColor;
  const font = style.font;

  return (
    <div
      style={{
        fontFamily: font,
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className="w-full h-full min-h-screen"
    >
      <MakdownStyling style={style}>
        <BlockStyling style={style}>{children}</BlockStyling>
      </MakdownStyling>
    </div>
  );
};

export default EditorWrapper;

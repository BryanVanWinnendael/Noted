import { codeStyle } from "./code";
import { tableStyle } from "./table";
import { nestedStyle } from "./nestcheck";
import { latexStyle } from "./latex";
import { soundStyle } from "./sound";
import type { NoteStyle } from "@lib/types";
import { headerStyle } from "./header";

const Index = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: NoteStyle;
}) => {
  const text_color = style.textColor;
  const background_color = style.backgroundColor;
  const secondary_background_color = style.secondaryBackgroundColor;
  const muted_text_color = style.muted;
  const border_color = style.borderColor;
  const accent_color = style.accent;
  const icon_color = style.iconColor;
  const header_colors = style.headerColors;

  return (
    <div>
      <style>
        {`
          ${headerStyle(text_color, header_colors)}
          ${codeStyle(background_color)}
          ${latexStyle(icon_color, muted_text_color)}
          ${nestedStyle(secondary_background_color, accent_color)}
          ${soundStyle(border_color)}
          ${tableStyle(
            background_color,
            secondary_background_color,
            muted_text_color,
            border_color,
          )}
        `}
      </style>
      {children}
    </div>
  );
};

export default Index;

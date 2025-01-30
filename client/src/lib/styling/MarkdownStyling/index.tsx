import { codeStyle } from "./code";
import type { NoteStyle } from "@lib/types";

const Index = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: NoteStyle;
}) => {
  const secondaryBackgroundColor = style.secondaryBackgroundColor;
  return (
    <div>
      <style>
        {`
              ${codeStyle(secondaryBackgroundColor)}
        `}
      </style>
      {children}
    </div>
  );
};

export default Index;

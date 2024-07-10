import type { NoteStyle } from "@lib/types";
import { useCallback, useEffect } from "react";
import BlockStyling from "./Block-Styling";
import "./fonts.css"

const EditorWrapper = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: NoteStyle;
}) => {
  const icon_color = style.iconColor;
  const bg_color = style.backgroundColor;
  const accent_color = style.accent;
  const text_color = style.textColor;
  const border_color = style.borderColor;
  const secondary_background_color = style.secondaryBackgroundColor;
  const bg_color_right = style.secondaryBackgroundColorLighter;
  const bg_color_left = style.secondaryBackgroundColorDarker;
  const font = style.font;

  const setTooltipStyle = useCallback(
    (classname: string) => {
      const contentStyles = {
        backgroundColor: bg_color_right,
        color: text_color,
        borderRadius: "4px",
      };

      const contentElements: any = document.getElementsByClassName(classname);
      const originalContentStyles: CSSStyleDeclaration[] = [];

      for (let i = 0; i < contentElements.length; i++) {
        originalContentStyles[i] = { ...contentElements[i].style };
      }

      // Apply new styles to elements with class .ct__content
      for (let i = 0; i < contentElements.length; i++) {
        Object.assign(contentElements[i].style, contentStyles);
      }
    },
    [bg_color_right, text_color],
  );

  const getTooltip = useCallback(() => {
    const contentElements: any = document.getElementsByClassName("ct__content");
    if (contentElements.length > 0) {
      setTooltipStyle("ct__content");
      setTooltipStyle("ct");
      setTooltipStyle("ct:after");
    }
  }, [setTooltipStyle]);

  useEffect(() => {
    const intervalId = setInterval(getTooltip, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
  }, [getTooltip, bg_color, text_color]);

  return (
    <div
      style={{
        fontFamily: font,
        color: text_color,
        backgroundColor: bg_color,
      }}
      className="w-full h-full"
    >
      <style>
        {`
          .css-18m9o4h{
            height: 100%;
          }
          .ce-toolbar__plus, .ce-toolbar__settings-btn{
            color: ${icon_color} !important;
            background-color: ${bg_color_left} !important;
            border-color: ${border_color} !important;
          }
          .ce-popover__container{
            background-color: ${bg_color} !important;
            border-color: ${border_color} !important;
          }
          .ce-popover-item__title {
            color: ${text_color} !important;
          }
          .ce-popover-item__icon {
            background: ${bg_color_left} !important;
            color: ${icon_color} !important;
            boxShadow: 0 0 0 1px ${border_color} !important;
            Webkit-box-shadow: 0 0 0 1px ${border_color} !important;
          }
          .ce-popover-item:hover:not(.ce-popover-item--no-hover) {
            background-color: ${bg_color_left} !important;
          }
          .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover{
            background-color: ${bg_color_left} !important;
          }
          .cdx-search-field {
            background-color: ${bg_color_left} !important;
            color: ${text_color} !important;
          }
          .ce-block--selected .ce-block__content {
            background-color: ${bg_color_left} !important;
          }
          .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check {
            background: ${accent_color} !important;
            background-color: ${accent_color} !important;
            border-color: ${accent_color} !important;
          }
          .cdx-checklist__item-checkbox-check:before{
            background-color: ${accent_color} !important;
          }
          .ce-inline-toolbar {
            background-color: ${bg_color_right} !important;
            border-color: ${border_color} !important;
            color: ${text_color} !important;
          }
          .ce-inline-toolbar__dropdown:hover, .ce-inline-tool:hover {
            background-color: ${secondary_background_color} !important;
          }
          .ce-conversion-toolbar {
            background-color: ${bg_color_right} !important;
            border-color: ${border_color} !important;
            color: ${text_color} !important;
          }
          .ce-conversion-tool:hover{
            background-color: ${secondary_background_color} !important;
          }
          .ce-conversion-tool__icon{
            background-color: ${secondary_background_color} !important;
            color: ${icon_color} !important; 
            box-shadow: 0 0 0 1px ${border_color} !important;
            Webkit-box-shadow: 0 0 0 1px ${border_color} !important;
          }
          .ce-inline-tool-input {
            background-color: ${secondary_background_color} !important;
            color: ${text_color} !important;
          }
          .ce-inline-tool--active {
            color: ${accent_color} !important;
          }
          .ce-toolbar__plus{
            background-color: ${secondary_background_color} !important;
            color: ${icon_color} !important;
            border-color: ${border_color} !important;
          }
          .ce-block__content {
            margin: 0 0 0 4rem !important;
          }
          .ce-toolbar__content {
            margin: 0 !important;
          }
          .ce-toolbar__actions {
            left: 0 !important;
            width: fit-content !important;
            background-color: transparent !important;
          }
          .cdx-checklist__item-checkbox-check {
            background-color: ${secondary_background_color} !important;
            border-color: ${border_color} !important;
          }
          @media (min-width: 651px) {
            .ce-popover {
              left: 100% !important;
            }
            .codex-editor--narrow, .ce-block--focused {
              margin-right: 0 !important;
              padding-right: 0 !important;
            }
          }
          .ce-header {
            padding: 0 !important;
          }
          .ce-paragraph[data-placeholder]:empty::before {
            opacity: 50% !important;
          }
          @media (max-width: 650px) {
            .ce-toolbar__plus {
              height: 24px !important;
              width: 24px !important;
              border: none !important;
            }
            .ce-toolbar__settings-btn {
              height: 24px !important;
              width: 24px !important;
              border: none !important;
            }
          }
        `}
      </style>
      <BlockStyling style={style}>{children}</BlockStyling>
    </div>
  );
};

export default EditorWrapper;

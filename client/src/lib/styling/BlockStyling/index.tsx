import { codeStyle } from "./code";
import { tableStyle } from "./table";
import { nestedStyle } from "./nestcheck";
import { latexStyle } from "./latex";
import { soundStyle } from "./sound";
import type { NoteStyle } from "@lib/types";
import { headerStyle } from "./header";
import { useCallback, useEffect } from "react";

const Index = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: NoteStyle;
}) => {
  const textColor = style.textColor;
  const backgroundColor = style.backgroundColor;
  const secondaryBackgroundColor = style.secondaryBackgroundColor;
  const mutedTextColor = style.muted;
  const borderColor = style.borderColor;
  const accentColor = style.accent;
  const iconColor = style.iconColor;
  const headerColors = style.headerColors;
  const backgroundColorLeft = style.secondaryBackgroundColorDarker;
  const backgroundColorRight = style.secondaryBackgroundColorLighter;

  const setTooltipStyle = useCallback(
    (classname: string) => {
      const contentStyles = {
        backgroundColor: backgroundColorRight,
        color: textColor,
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
    [backgroundColorRight, textColor],
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
  }, [getTooltip, backgroundColor, textColor]);

  return (
    <div>
      <style>
        {`
          ${headerStyle(textColor, headerColors)}
          ${codeStyle(backgroundColor)}
          ${latexStyle(iconColor, mutedTextColor)}
          ${nestedStyle(secondaryBackgroundColor, accentColor)}
          ${soundStyle(borderColor)}
          ${tableStyle(
            backgroundColor,
            secondaryBackgroundColor,
            mutedTextColor,
            borderColor,
          )}
        `}
        {`
          .css-18m9o4h{
            height: 100%;
          }
          .ce-toolbar__plus, .ce-toolbar__settings-btn{
            color: ${iconColor} !important;
            background-color: ${backgroundColorLeft} !important;
            border-color: ${borderColor} !important;
          }
          .ce-popover__container{
            background-color: ${backgroundColor} !important;
            border-color: ${borderColor} !important;
          }
          .ce-popover-item__title {
            color: ${textColor} !important;
          }
          .ce-popover-item__icon {
            background: ${backgroundColorLeft} !important;
            color: ${iconColor} !important;
            boxShadow: 0 0 0 1px ${borderColor} !important;
            Webkit-box-shadow: 0 0 0 1px ${borderColor} !important;
          }
          .ce-popover-item:hover:not(.ce-popover-item--no-hover) {
            background-color: ${backgroundColorLeft} !important;
          }
          .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover{
            background-color: ${backgroundColorLeft} !important;
          }
          .cdx-search-field {
            background-color: ${backgroundColorLeft} !important;
            color: ${textColor} !important;
          }
          .ce-block--selected .ce-block__content {
            background-color: ${backgroundColorLeft} !important;
          }
          .cdx-checklist__item--checked .cdx-checklist__item-checkbox-check {
            background: ${accentColor} !important;
            background-color: ${accentColor} !important;
            border-color: ${accentColor} !important;
          }
          .cdx-checklist__item-checkbox-check:before{
            background-color: ${accentColor} !important;
          }
          .ce-inline-toolbar {
            background-color: ${backgroundColorRight} !important;
            border-color: ${borderColor} !important;
            color: ${textColor} !important;
          }
          .ce-inline-toolbar__dropdown:hover, .ce-inline-tool:hover {
            background-color: ${secondaryBackgroundColor} !important;
          }
          .ce-conversion-toolbar {
            background-color: ${backgroundColorRight} !important;
            border-color: ${borderColor} !important;
            color: ${textColor} !important;
          }
          .ce-conversion-tool:hover{
            background-color: ${secondaryBackgroundColor} !important;
          }
          .ce-conversion-tool__icon{
            background-color: ${secondaryBackgroundColor} !important;
            color: ${iconColor} !important; 
            box-shadow: 0 0 0 1px ${borderColor} !important;
            Webkit-box-shadow: 0 0 0 1px ${borderColor} !important;
          }
          .ce-inline-tool-input {
            background-color: ${secondaryBackgroundColor} !important;
            color: ${textColor} !important;
          }
          .ce-inline-tool--active {
            color: ${accentColor} !important;
          }
          .ce-toolbar__plus{
            background-color: ${secondaryBackgroundColor} !important;
            color: ${iconColor} !important;
            border-color: ${borderColor} !important;
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
            background-color: ${secondaryBackgroundColor} !important;
            border-color: ${borderColor} !important;
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
      {children}
    </div>
  );
};

export default Index;

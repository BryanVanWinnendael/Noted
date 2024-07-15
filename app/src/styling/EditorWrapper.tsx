import { Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import BlockStyling from "styling/Block-Styling";
import useColors from "hooks/useColors";
import "styling/splitScreen.css";
import { splitScreen } from "./SplitScreen";

const EditorWrapper = ({ children }: { children: JSX.Element }) => {
  const {
    borderColor,
    iconColor,
    backgroundColor,
    accentColor,
    textColor,
    secondaryBackgroundColorLighter,
    mutedTextColor,
    getTransparent,
    secondaryBackgroundColorDarker,
  } = useColors();

  const setTooltipStyle = useCallback(
    (classname: string) => {
      const contentStyles = {
        backgroundColor: secondaryBackgroundColorLighter,
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
    [secondaryBackgroundColorLighter, textColor],
  );

  const getTooltip = useCallback(() => {
    const contentElements: any = document.getElementsByClassName("ct__content");
    if (contentElements.length > 0) {
      setTooltipStyle("ct__content");
      setTooltipStyle("ct");
      setTooltipStyle("ct:after");
    }
  }, [setTooltipStyle]);

  const setSplitScreenColor = useCallback(() => {
    const root = document.documentElement;
    const color = getTransparent(0.2, mutedTextColor);
    root.style.setProperty("--focus-border", color);
  }, [mutedTextColor, getTransparent]);

  useEffect(() => {
    const intervalId = setInterval(getTooltip, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
    setSplitScreenColor();
  }, [getTooltip, backgroundColor, textColor, setSplitScreenColor]);

  return (
    <Box
      pb={2}
      h="full"
      css={{
        ...splitScreen(mutedTextColor),
        ".css-18m9o4h": {
          height: "100%",
        },
        ".ce-toolbar__plus, .ce-toolbar__settings-btn": {
          color: iconColor,
          backgroundColor: secondaryBackgroundColorDarker,
          borderColor: borderColor,
        },
        ".ce-popover": {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        ".ce-popover-item__title": {
          color: textColor,
        },
        ".ce-popover-item__icon": {
          background: secondaryBackgroundColorDarker,
          color: iconColor,
          boxShadow: `0 0 0 1px ${borderColor}`,
          WebkitBoxShadow: `0 0 0 1px ${borderColor}`,
        },
        ".ce-popover-item:hover:not(.ce-popover-item--no-hover)": {
          backgroundColor: secondaryBackgroundColorDarker,
        },
        ".ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover": {
          backgroundColor: secondaryBackgroundColorDarker,
        },
        ".cdx-search-field": {
          backgroundColor: secondaryBackgroundColorDarker,
          color: textColor,
        },
        ".ce-block--selected .ce-block__content": {
          backgroundColor: secondaryBackgroundColorDarker,
        },
        ".cdx-checklist__item--checked .cdx-checklist__item-checkbox-check": {
          background: accentColor,
          backgroundColor: accentColor,
          borderColor: accentColor,
        },
        ".cdx-checklist__item-checkbox-check:before": {
          backgroundColor: accentColor,
        },
        ".ce-inline-toolbar": {
          backgroundColor: secondaryBackgroundColorLighter,
          borderColor: borderColor,
          color: textColor,
        },
        ".ce-inline-toolbar__dropdown:hover, .ce-inline-tool:hover": {
          backgroundColor: secondaryBackgroundColorDarker,
        },
        ".ce-conversion-toolbar": {
          backgroundColor: secondaryBackgroundColorLighter,
          borderColor: borderColor,
          color: textColor,
        },
        ".ce-conversion-tool:hover": {
          backgroundColor: secondaryBackgroundColorDarker,
        },
        ".ce-conversion-tool__icon": {
          backgroundColor: secondaryBackgroundColorDarker,
          color: iconColor,
          boxShadow: `0 0 0 1px ${borderColor}`,
          WebkitBoxShadow: `0 0 0 1px ${borderColor}`,
        },
        ".ce-inline-tool-input": {
          backgroundColor: secondaryBackgroundColorDarker,
          color: textColor,
        },
        ".ce-inline-tool--active": {
          color: accentColor,
        },
        ".ce-toolbar__plus": {
          backgroundColor: secondaryBackgroundColorDarker,
          color: iconColor,
          borderColor: borderColor,
        },
        ".ce-block__content": {
          margin: "0 0 0 4rem",
        },
        ".ce-toolbar__content": {
          margin: 0,
        },
        ".ce-toolbar__actions": {
          left: 0,
          width: "fit-content",
          backgroundColor: "transparent",
        },
        ".cdx-checklist__item-checkbox-check": {
          backgroundColor: secondaryBackgroundColorDarker,
          borderColor: borderColor,
        },
        "@media (min-width: 651px)": {
          ".ce-popover": {
            left: "100% !important",
          },
          ".codex-editor--narrow, .ce-block--focused": {
            marginRight: 0,
            paddingRight: 0,
          },
        },
        ".ce-header": {
          padding: 0,
        },
        ".ce-paragraph[data-placeholder]:empty::before": {
          opacity: "50%",
        },
        "@media (max-width: 650px)": {
          ".ce-toolbar__plus": {
            height: "24px",
            width: "24px",
            border: "none",
          },
          ".ce-toolbar__settings-btn": {
            height: "24px",
            width: "24px",
            border: "none",
          },
        },
      }}
    >
      <BlockStyling>{children}</BlockStyling>
    </Box>
  );
};

export default EditorWrapper;

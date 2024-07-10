import { Box } from "@chakra-ui/react";
import { utils } from "utils";
import { useCallback, useEffect } from "react";
import BlockStyling from "styling/Block-Styling";
import useColors from "hooks/useColors";
import "styling/splitScreen.css";
import { splitScreen } from "./SplitScreen";

const EditorWrapper = ({ children }: { children: JSX.Element }) => {
  const {
    getBorderColor,
    getIconColor,
    getBackgroundColor,
    getAccentColor,
    getTextColor,
    getSecondaryBackgroundColor,
    getMutedTextColor,
  } = useColors();

  const icon_color = getIconColor();
  const bg_color = getBackgroundColor();
  const accent_color = getAccentColor();
  const text_color = getTextColor();
  const border_color = getBorderColor();
  const muted_text_color = getMutedTextColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color_right = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  );

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

  const setSplitScreenColor = useCallback(() => {
    const root = document.documentElement;
    const color = utils.getTransparent(0.2, muted_text_color);
    root.style.setProperty("--focus-border", color);
  }, [muted_text_color]);

  useEffect(() => {
    const intervalId = setInterval(getTooltip, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
    setSplitScreenColor();
  }, [getTooltip, bg_color, text_color, setSplitScreenColor]);

  return (
    <Box
      pb={2}
      h="full"
      css={{
        ...splitScreen(muted_text_color),
        ".css-18m9o4h": {
          height: "100%",
        },
        ".ce-toolbar__plus, .ce-toolbar__settings-btn": {
          color: icon_color,
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          borderColor: border_color,
        },
        ".ce-popover": {
          backgroundColor: bg_color,
          borderColor: border_color,
        },
        ".ce-popover-item__title": {
          color: text_color,
        },
        ".ce-popover-item__icon": {
          background: utils.getDarkerColor("0.03", bg_color_right),
          color: icon_color,
          boxShadow: `0 0 0 1px ${border_color}`,
          WebkitBoxShadow: `0 0 0 1px ${border_color}`,
        },
        ".ce-popover-item:hover:not(.ce-popover-item--no-hover)": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
        },
        ".ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
        },
        ".cdx-search-field": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          color: text_color,
        },
        ".ce-block--selected .ce-block__content": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
        },
        ".cdx-checklist__item--checked .cdx-checklist__item-checkbox-check": {
          background: accent_color,
          backgroundColor: accent_color,
          borderColor: accent_color,
        },
        ".cdx-checklist__item-checkbox-check:before": {
          backgroundColor: accent_color,
        },
        ".ce-inline-toolbar": {
          backgroundColor: bg_color_right,
          borderColor: border_color,
          color: text_color,
        },
        ".ce-inline-toolbar__dropdown:hover, .ce-inline-tool:hover": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
        },
        ".ce-conversion-toolbar": {
          backgroundColor: bg_color_right,
          borderColor: border_color,
          color: text_color,
        },
        ".ce-conversion-tool:hover": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
        },
        ".ce-conversion-tool__icon": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          color: icon_color,
          boxShadow: `0 0 0 1px ${border_color}`,
          WebkitBoxShadow: `0 0 0 1px ${border_color}`,
        },
        ".ce-inline-tool-input": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          color: text_color,
        },
        ".ce-inline-tool--active": {
          color: accent_color,
        },
        ".ce-toolbar__plus": {
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          color: icon_color,
          borderColor: border_color,
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
          backgroundColor: utils.getDarkerColor("0.03", bg_color_right),
          borderColor: border_color,
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

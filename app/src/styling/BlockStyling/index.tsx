import { Box } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import { headerStyle } from "styling/BlockStyling/header";
import { codeStyle } from "./code";
import { tableStyle } from "./table";
import useColors from "hooks/useColors";
import { nestedStyle } from "./nestcheck";
import { latexStyle } from "./latex";
import { soundStyle } from "./sound";

const Index = ({ children }: { children: JSX.Element }) => {
  const { headerColors, headerColorsEnabled } = useSettingsStore();
  const {
    textColor,
    backgroundColor,
    secondaryBackgroundColorLighter,
    mutedTextColor,
    borderColor,
    accentColor,
    iconColor,
  } = useColors();

  return (
    <Box
      h="100%"
      __css={{
        ...soundStyle(borderColor),
        ...latexStyle(iconColor, mutedTextColor),
        ...nestedStyle(secondaryBackgroundColorLighter, accentColor),
        ...headerStyle(headerColorsEnabled, headerColors, textColor),
        ...codeStyle(backgroundColor),
        ...tableStyle(
          backgroundColor,
          secondaryBackgroundColorLighter,
          mutedTextColor,
          borderColor,
        ),
      }}
    >
      {children}
    </Box>
  );
};

export default Index;

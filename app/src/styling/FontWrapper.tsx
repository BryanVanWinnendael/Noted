import { Box } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useEffect } from "react";
import "styling/fonts.css";

const FontWrapper = ({ children }: { children: JSX.Element }) => {
  const { fontFamily } = useSettings();

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  return <Box>{children}</Box>;
};

export default FontWrapper;

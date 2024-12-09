import { Box } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import { useEffect } from "react";
import "styling/fonts.css";

const FontWrapper = ({ children }: { children: JSX.Element }) => {
  const { fontFamily } = useSettingsStore();

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  return <Box>{children}</Box>;
};

export default FontWrapper;

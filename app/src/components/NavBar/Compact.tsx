import { Box } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";

const Compact = () => {
  const { backgroundColor } = useColors();
  const { glassBackground, glassEnabled } = useSettings();

  const isGlassEnabled = glassEnabled && glassBackground.window;

  return (
    <Box
      bg={isGlassEnabled ? "transparent" : backgroundColor}
      w="full"
      h={2}
      className="nav"
    />
  );
};

export default Compact;

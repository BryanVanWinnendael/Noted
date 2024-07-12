import { Box, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";

const SaveButton = ({ callback }: { callback: () => void }) => {
  const { backgroundColor, textColor } = useColors();

  return (
    <Tooltip
      placement="bottom"
      label={"Ctrl+Alt+S"}
      bg={backgroundColor}
      color={textColor}
      rounded="md"
    >
      <Box
        css={{
          backgroundColor: "var(--color-surface-low)",
          boxSizing: "border-box",
          padding: "0.625rem",
          borderRadius: "var(--border-radius-lg)",
          cursor: "pointer",
          boxShadow: "0 0 0 1px var(--color-surface-lowest)",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          fontSize: "0.75rem",
          letterSpacing: "0.4px",
          ":hover": {
            backgroundColor: "var(--button-hover-bg, var(--island-bg-color))",
          },
        }}
        onClick={callback}
      >
        Save
      </Box>
    </Tooltip>
  );
};

export default SaveButton;

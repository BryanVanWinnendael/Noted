import { Box, Flex } from "@chakra-ui/react";
import { utils } from "utils";
import { PanelResizeHandle } from "react-resizable-panels";
import useColors from "hooks/useColors";
import { useState } from "react";

export default function ResizeHandle({ id }: { id?: string }) {
  const { getMutedTextColor } = useColors();
  const [hover, setHover] = useState(false);

  const muted_text_color = getMutedTextColor();

  return (
    <PanelResizeHandle id={id}>
      <Flex
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        h="full"
        justifyContent="center"
        alignItems="center"
        w={2}
        py={5}
      >
        <Box
          w={1}
          bg={utils.getTransparent(0.2, muted_text_color)}
          h={hover ? "100%" : 5}
          transition="all 0.2s"
          rounded="sm"
        ></Box>
      </Flex>
    </PanelResizeHandle>
  );
}

import { Box } from "@chakra-ui/react";
import { codeStyle } from "./code";
import useColors from "hooks/useColors";

const Index = ({ children }: { children: JSX.Element }) => {
  const { secondaryBackgroundColor } = useColors();

  return (
    <Box
      h="100%"
      __css={{
        ...codeStyle(secondaryBackgroundColor),
      }}
    >
      {children}
    </Box>
  );
};

export default Index;

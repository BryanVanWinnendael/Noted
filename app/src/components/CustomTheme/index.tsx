import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import CustomColors from "components/CustomTheme/CustomColors";
import useColors from "hooks/useColors";
import ThemeChooser from "./ThemeChooser";

const Index = () => {
  const { mutedTextColor } = useColors();
  const { colorMode } = useColorMode();

  return (
    <Box p={2}>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mb={4}>
        <Box>
          <Text fontWeight="semibold">Base color scheme</Text>
          <Text color={mutedTextColor}>Choose default color scheme</Text>
        </Box>
        <ThemeChooser />
      </Flex>
      {String(colorMode) === "custom_theme" && <CustomColors />}
    </Box>
  );
};

export default Index;

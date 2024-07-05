import { Center, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";

const NoFile = () => {
  const { getTextColor, getBorderColor } = useColors();

  const text_color = getTextColor();
  const border_color = getBorderColor();

  return (
    <Center
      border="1px"
      borderColor={border_color}
      rounded="md"
      w="full"
      h="full"
    >
      <Text color={text_color} fontSize="xl" fontWeight="bold" m="auto">
        No file selected
      </Text>
    </Center>
  );
};

export default NoFile;

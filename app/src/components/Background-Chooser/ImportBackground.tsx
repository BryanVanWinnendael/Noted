import { Box, Card, Icon, Stack } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { IoIosAdd } from "react-icons/io";

const ImportBackground = () => {
  const { getBorderColor, getIconColor, getBackgroundColor } = useColors();
  const { importBackground } = useWorkspace();

  const icon_color = getIconColor();
  const border_color = getBorderColor();
  const background_color = getBackgroundColor();

  const handleClick = () => {
    importBackground();
  };

  return (
    <Stack>
      <Card
        onClick={handleClick}
        cursor="pointer"
        border="1px"
        borderColor={border_color}
        rounded="md"
        w={200}
        h={100}
        transition="all 0.3s"
        _hover={{
          scale: 1.05,
        }}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={background_color}
      >
        <Box
          transition="all 0.3s"
          _hover={{
            opacity: 0.1,
          }}
          w="full"
          h="full"
          position="absolute"
          bg="black"
          opacity={0}
        />
        <Icon color={icon_color} as={IoIosAdd} w={70} h={70} />
      </Card>
    </Stack>
  );
};

export default ImportBackground;

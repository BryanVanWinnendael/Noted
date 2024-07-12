import { Box, Card, Icon, Stack } from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { IoIosAdd } from "react-icons/io";

const ImportBackground = () => {
  const { borderColor, iconColor, backgroundColor } = useColors();
  const { importBackground } = useWorkspace();

  const handleClick = () => {
    importBackground();
  };

  return (
    <Stack>
      <Card
        onClick={handleClick}
        cursor="pointer"
        border="1px"
        borderColor={borderColor}
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
        bg={backgroundColor}
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
        <Icon color={iconColor} as={IoIosAdd} w={70} h={70} />
      </Card>
    </Stack>
  );
};

export default ImportBackground;

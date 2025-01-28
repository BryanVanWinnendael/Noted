import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import { IoIosCheckmarkCircle } from "react-icons/io";

const BackgroundCard = ({
  image,
  name,
  select,
}: {
  image?: string;
  name: string;
  select: string;
}) => {
  const { backgroundColor, borderColor } = useColors();
  const { saveSettings, backgroundImage } = useSettingsStore();
  const selected = backgroundImage === select;

  const handleClick = () => {
    saveSettings("background_image", select);
  };

  return (
    <Stack>
      <Box
        onClick={handleClick}
        cursor="pointer"
        border="1px"
        borderColor={borderColor}
        rounded="md"
        w={200}
        h={100}
        transition="all 0.3s"
        position="relative"
        overflow="hidden"
      >
        {image ? (
          <Box
            as="img"
            src={image}
            alt={name}
            loading="lazy"
            w="full"
            h="full"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
          />
        ) : (
          <Box
            w="full"
            h="full"
            bg={backgroundColor}
            position="absolute"
            top={0}
            left={0}
          />
        )}
        
        {selected && (
          <Flex 
            alignItems="center" 
            gap={1} 
            zIndex={2}
            position="relative"
            justifyContent="center"
            h="full"
          >
            <IoIosCheckmarkCircle />
            <Text textAlign="center">selected</Text>
          </Flex>
        )}
        <Box
          transition="all 0.3s"
          _hover={{
            opacity: selected ? 0.3 : 0.1,
          }}
          w="full"
          h="full"
          position="absolute"
          bg="black"
          opacity={selected ? 0.3 : 0}
        />
      </Box>
      <Text textAlign="center">{name}</Text>
    </Stack>
  );
};

export default BackgroundCard;
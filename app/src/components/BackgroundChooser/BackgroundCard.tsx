import { Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
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
      <Card
        onClick={handleClick}
        cursor="pointer"
        backgroundColor={backgroundColor}
        border="1px"
        borderColor={borderColor}
        rounded="md"
        w={200}
        h={100}
        transition="all 0.3s"
        background={image && `url(${image})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {selected && (
          <Flex alignItems="center" gap={1} zIndex={2}>
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
      </Card>
      <Text textAlign="center">{name}</Text>
    </Stack>
  );
};

export default BackgroundCard;

import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import BackgroundChooser from "components/BackgroundChooser";
import BlurChooser from "components/BlurChooser";
import WallpaperBrightness from "components/WallpaperBrightness";

const Background = () => {
  return (
    <Box w="full" maxW="full">
      <Text fontSize="3xl">Background</Text>
      <Stack mr={5} gap={3}>
        <BlurChooser />
        <WallpaperBrightness />
        <Divider my={4} />
        <BackgroundChooser />
      </Stack>
    </Box>
  );
};

export default Background;

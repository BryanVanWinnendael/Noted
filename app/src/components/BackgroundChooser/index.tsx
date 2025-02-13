import { Flex, Stack, Text } from "@chakra-ui/react";
import BackgroundCard from "./BackgroundCard";
import {
  backgroundColors,
  backgroundCities,
  backgroundAbstract,
  backgroundGradients,
  backgrounds,
} from "utils/images";
import ImportBackground from "./ImportBackground";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import ImportCard from "./ImportCard";

const Index = () => {
  const { backgrounds: importedBackgrounds } = useWorkspaceStore();

  return (
    <Stack w="full">
      <Text>Imported</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        <ImportBackground />
        {Object.keys(backgroundColors).map((background, index) => (
          <BackgroundCard
            key={index}
            select={background}
            name={
              backgrounds[background as keyof typeof backgrounds]?.name || ""
            }
            image={backgrounds[background as keyof typeof backgrounds]?.image}
          />
        ))}
        {importedBackgrounds.map((path, index) => (
          <ImportCard key={index} path={path} />
        ))}
      </Flex>
      <Text>Gradient</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {Object.keys(backgroundGradients).map((background, index) => (
          <BackgroundCard
            key={index}
            select={background}
            name={
              backgrounds[background as keyof typeof backgrounds]?.name || ""
            }
            image={backgrounds[background as keyof typeof backgrounds]?.image}
          />
        ))}
      </Flex>
      <Text>Abstract</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {Object.keys(backgroundAbstract).map((background, index) => (
          <BackgroundCard
            key={index}
            select={background}
            name={
              backgrounds[background as keyof typeof backgrounds]?.name || ""
            }
            image={backgrounds[background as keyof typeof backgrounds]?.image}
          />
        ))}
      </Flex>
      <Text>Cities</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {Object.keys(backgroundCities).map((background, index) => (
          <BackgroundCard
            key={index}
            select={background}
            name={
              backgrounds[background as keyof typeof backgrounds]?.name || ""
            }
            image={backgrounds[background as keyof typeof backgrounds]?.image}
          />
        ))}
      </Flex>
    </Stack>
  );
};

export default Index;

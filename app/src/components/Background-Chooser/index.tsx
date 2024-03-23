import { Flex, Stack, Text} from '@chakra-ui/react'
import BackgroundCard from './BackgroundCard'
import { backgroundColors, backgroundCities, backgroundAcrylic, backgrounds } from 'utils/images'

const Index = () => {

  return (
    <Stack w="full">
      <Text>Colors</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {
          Object.keys(backgroundColors).map((background, index) => (
            <BackgroundCard key={index} select={background} name={backgrounds[background as keyof typeof backgrounds]?.name || ""} image={backgrounds[background as keyof typeof backgrounds]?.image} />
          ))
        }
      </Flex>
      <Text>Cities</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {
          Object.keys(backgroundCities).map((background, index) => (
            <BackgroundCard key={index} select={background} name={backgrounds[background as keyof typeof backgrounds]?.name || ""} image={backgrounds[background as keyof typeof backgrounds]?.image} />
          ))
        }
      </Flex>
      <Text>Acrylic</Text>
      <Flex gap={2} overflowX="scroll" w="full" maxW="100%" pr={3}>
        {
          Object.keys(backgroundAcrylic).map((background, index) => (
            <BackgroundCard key={index} select={background} name={backgrounds[background as keyof typeof backgrounds]?.name || ""} image={backgrounds[background as keyof typeof backgrounds]?.image} />
          ))
        }
      </Flex>
    </Stack>
  )
}

export default Index
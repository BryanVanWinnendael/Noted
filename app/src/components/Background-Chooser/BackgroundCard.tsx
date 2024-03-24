import { Box, Card, Flex, Stack, Text } from '@chakra-ui/react'
import { useSettings } from 'contexts/SettingsContext'
import useColors from 'hooks/useColors'
import { IoIosCheckmarkCircle } from "react-icons/io";

const BackgroundCard = ({ image, name, select }: { image?: string, name: string, select: string }) => {
  const { getBackgroundColor, getBorderColor } = useColors()
  const { saveSettings, backgroundImage } = useSettings()
  const selected = backgroundImage === select

  const bg_color = getBackgroundColor()

  const border_color = getBorderColor()

  const handleClick = () => {
    saveSettings("background_image", select)
  }

  return (
    <Stack
    >
      <Card 
      onClick={handleClick}
      cursor="pointer"
      backgroundColor={bg_color}
      border="1px"
      borderColor={border_color}
      rounded="md"
      w={200}
      h={100}
      transition="all 0.3s"
      background={image &&`url(${image})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      position="relative"
      display="flex" 
      justifyContent="center"
      alignItems="center"
      >
        { selected && 
        <Flex alignItems="center" gap={1} zIndex={2}>
          <IoIosCheckmarkCircle />
          <Text textAlign="center">selected</Text>
        </Flex>
        }
        <Box
        transition="all 0.3s"
        _hover={{
          opacity: selected ? 0.3 : 0.1
        }} 
        w="full" h="full"
        position="absolute" bg="black" opacity={selected ? 0.3 : 0} />
      </Card>
      <Text textAlign="center">{name}</Text>
    </Stack>
  )
}

export default BackgroundCard
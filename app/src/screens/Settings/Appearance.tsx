import {
  Box,
  Text,
  Flex,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Icon,
  Stack,
} from "@chakra-ui/react";
import CustomTheme from "components/CustomTheme";
import CustomHeaders from "components/CustomHeaders";
import { FaPalette } from "react-icons/fa";
import GlassChooser from "components/GlassChooser";
import { GiCrackedGlass } from "react-icons/gi";
import useColors from "hooks/useColors";
import Compact from "components/Compact";
import FontChooser from "components/FontChooser";
import EditorTitle from "components/EditorTitle";
import Scrollbar from "components/Scrollbar";
import { CgScrollV } from "react-icons/cg";
import { LuHeading } from "react-icons/lu";

const Appearance = () => {
  const {
    accentColor,
    textColor,
    getTransparent,
    secondaryBackgroundColorDarker,
  } = useColors();

  return (
    <Box>
      <Text fontSize="3xl" mb={4}>
        Appearance
      </Text>
      <Stack gap={3} mr={5} mb={4}>
        <Accordion allowMultiple defaultIndex={[0]}>
          <AccordionItem border={0}>
            <AccordionButton
              fill={textColor}
              _expanded={{
                bg: getTransparent(0.2, accentColor),
                fill: accentColor,
                color: accentColor,
              }}
              border={0}
              _hover={{
                bg: secondaryBackgroundColorDarker,
                color: textColor,
              }}
              rounded="md"
            >
              <Flex
                gap={2}
                alignItems="center"
                as="span"
                flex="1"
                textAlign="left"
              >
                <Icon as={FaPalette} w={7} h={7} />
                <Text fontSize="xl">Theme</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomTheme />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={0}>
            <AccordionButton
              fill={textColor}
              _expanded={{
                bg: getTransparent(0.2, accentColor),
                fill: accentColor,
                color: accentColor,
              }}
              border={0}
              _hover={{
                fill: textColor,
                bg: secondaryBackgroundColorDarker,
                color: textColor,
              }}
              rounded="md"
            >
              <Flex
                gap={2}
                alignItems="center"
                as="span"
                flex="1"
                textAlign="left"
              >
                <Icon as={LuHeading} w={7} h={7} />
                <Text fontSize="xl">Headers</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomHeaders />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border={0}>
            <AccordionButton
              fill={textColor}
              _expanded={{
                bg: getTransparent(0.2, accentColor),
                fill: accentColor,
                color: accentColor,
              }}
              border={0}
              _hover={{
                bg: secondaryBackgroundColorDarker,
                color: textColor,
              }}
              rounded="md"
            >
              <Flex
                gap={2}
                alignItems="center"
                as="span"
                flex="1"
                textAlign="left"
              >
                <Icon as={GiCrackedGlass} w={7} h={7} />
                <Text fontSize="xl">Glassy</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <GlassChooser />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={0}>
            <AccordionButton
              fill={textColor}
              _expanded={{
                bg: getTransparent(0.2, accentColor),
                fill: accentColor,
                color: accentColor,
              }}
              border={0}
              _hover={{
                bg: secondaryBackgroundColorDarker,
                color: textColor,
              }}
              rounded="md"
            >
              <Flex
                gap={2}
                alignItems="center"
                as="span"
                flex="1"
                textAlign="left"
              >
                <Icon as={CgScrollV} w={7} h={7} />
                <Text fontSize="xl">Scrollbar</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Scrollbar />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <EditorTitle />
        <Compact />
        <FontChooser />
      </Stack>
    </Box>
  );
};

export default Appearance;

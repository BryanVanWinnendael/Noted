import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Center,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useRef } from "react";
import { utils } from "utils/index";
import AddFileDialog from "./Side-Nav/Actions/AddFileDialog";
import { TbFilePlus } from "react-icons/tb";
import AddExcalidrawDialog from "./Side-Nav/Actions/AddExcalidrawDialog";

const NoFile = () => {
  const {
    getTextColor,
    getBorderColor,
    getAccentColor,
    getBackgroundColor,
    getIconColor,
    getSecondaryBackgroundColor,
  } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFile,
    onOpen: onOpenFile,
    onClose: onCloseFile,
  } = useDisclosure();
  const {
    isOpen: isOpenExcalidraw,
    onOpen: onOpenExcalidraw,
    onClose: onCloseExcalidraw,
  } = useDisclosure();
  const cancelRef = useRef();

  const text_color = getTextColor();
  const border_color = getBorderColor();
  const accent_color = getAccentColor();
  const bg_color = getBackgroundColor();
  const icon_color = getIconColor();
  const secondary_background_color = getSecondaryBackgroundColor();

  return (
    <>
      <AddFileDialog onClose={onCloseFile} isOpen={isOpenFile} />
      <AddExcalidrawDialog
        onClose={onCloseExcalidraw}
        isOpen={isOpenExcalidraw}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={secondary_background_color}
          color={utils.getTextColor(bg_color)}
          shadow="md"
        >
          <AlertDialogBody>
            <Flex direction="column" gap={2} alignItems="flex-start">
              <Button
                onClick={onOpenFile}
                _hover={{
                  bg: utils.getDarkerColor("0.03", secondary_background_color),
                }}
                color={icon_color}
                bg="none"
                h={7}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <TbFilePlus /> Create noted file
              </Button>

              <Button
                onClick={onOpenExcalidraw}
                _hover={{
                  bg: utils.getDarkerColor("0.03", secondary_background_color),
                }}
                color={icon_color}
                bg="none"
                h={7}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <TbFilePlus /> Create excalidraw file
              </Button>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <Center
        border="1px"
        borderColor={border_color}
        rounded="md"
        w="full"
        h="full"
      >
        <Flex direction="column" gap={1}>
          <Text color={text_color} fontSize="xl" fontWeight="bold" m="auto">
            No file opened
          </Text>
          <Text color={text_color} fontSize="md" m="auto">
            Please select a file from the sidebar
          </Text>
          <Text
            onClick={onOpen}
            cursor="pointer"
            color={accent_color}
            fontSize="md"
            m="auto"
            decoration="underline"
            fontWeight="bold"
          >
            or create a new file
          </Text>
        </Flex>
      </Center>
    </>
  );
};

export default NoFile;

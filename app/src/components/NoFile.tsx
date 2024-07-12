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
import AddFileDialog from "./SideNav/Actions/AddFileDialog";
import { TbFilePlus } from "react-icons/tb";
import AddExcalidrawDialog from "./SideNav/Actions/AddExcalidrawDialog";

const NoFile = () => {
  const {
    textColor,
    borderColor,
    accentColor,
    iconColor,
    secondaryBackgroundColor,
    secondaryBackgroundColorDarker
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
          bg={secondaryBackgroundColor}
          color={textColor}
          shadow="md"
        >
          <AlertDialogBody>
            <Flex direction="column" gap={2} alignItems="flex-start">
              <Button
                onClick={onOpenFile}
                _hover={{
                  bg: secondaryBackgroundColorDarker,
                }}
                color={iconColor}
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
                  bg: secondaryBackgroundColorDarker,
                }}
                color={iconColor}
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
        borderColor={borderColor}
        rounded="md"
        w="full"
        h="full"
      >
        <Flex direction="column" gap={1}>
          <Text color={textColor} fontSize="xl" fontWeight="bold" m="auto">
            No file opened
          </Text>
          <Text color={textColor} fontSize="md" m="auto">
            Please select a file from the sidebar
          </Text>
          <Text
            onClick={onOpen}
            cursor="pointer"
            color={accentColor}
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

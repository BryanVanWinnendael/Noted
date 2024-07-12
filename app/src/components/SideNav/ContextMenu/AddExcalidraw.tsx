import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  useDisclosure,
  Text,
  MenuItem,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useRef, useState } from "react";
import { ContextMenu } from "types/index";
import { MdOutlineDraw } from "react-icons/md";

const AddExcalidraw = ({ path, type }: ContextMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { accentColor, backgroundColor, textColor, iconColor, backgroundColorDarker } =
    useColors();
  const cancelRef = useRef();
  const [fileName, setFileName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);
  const { makeNewFile } = useWorkspace();

  const handleAddToFile = async () => {
    const folderPath = path.split("\\").slice(0, -1).join("\\");
    const filename = fileName + ".excalidraw";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };

  const handleAddToFolder = async () => {
    const folderPath = path;
    const filename = fileName + ".excalidraw";
    const res = await makeNewFile(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFileName("");
    onClose();
  };

  const handleAdd = async () => {
    if (fileName === "") {
      setInValidName(true);
      return;
    }

    if (type === "file") {
      handleAddToFile();
    } else {
      handleAddToFolder();
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={backgroundColor}
          color={textColor}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={fileName}
              onChange={(e) => {
                setInValidName(false);
                setFileName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accentColor}
              errorBorderColor="red.300"
              placeholder="Choose a file name"
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <MenuItem
        onClick={onOpen}
        m={0}
        p={1}
        bg="transparent"
        color={textColor}
        rounded="md"
        px={2}
        _hover={{ bg: backgroundColorDarker }}
        gap={2}
      >
        <MdOutlineDraw color={iconColor} width={5} height={5} />
        <Text fontSize="sm">Add Excalidraw File</Text>
      </MenuItem>
    </>
  );
};

export default AddExcalidraw;

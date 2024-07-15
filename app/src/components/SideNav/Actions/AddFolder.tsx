import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Input,
  useDisclosure,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useRef, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const AddFolder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    iconColor,
    accentColor,
    textColor,
    secondaryBackgroundColorLighter,
    secondaryBackgroundColorDarker,
  } = useColors();
  const cancelRef = useRef();
  const [folderName, setFolderName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);
  const { activeFolder, makeNewFolder } = useWorkspace();

  const handleCreateFolder = async () => {
    if (folderName === "") {
      setInValidName(true);
      return;
    }
    const folderPath = activeFolder || "";
    const filename = folderName;
    const res = await makeNewFolder(filename, folderPath);
    if (!res) {
      setInValidName(true);
      return;
    }
    setFolderName("");
    onClose();
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
          bg={secondaryBackgroundColorLighter}
          color={textColor}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={folderName}
              onChange={(e) => {
                setInValidName(false);
                setFolderName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateFolder();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accentColor}
              errorBorderColor="red.300"
              placeholder="Choose a folder name"
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <Tooltip
        placement="bottom"
        label={"Create folder"}
        bg={secondaryBackgroundColorLighter}
        color={textColor}
        rounded="md"
      >
        <IconButton
          onClick={onOpen}
          _hover={{ bg: secondaryBackgroundColorDarker }}
          color={iconColor}
          bg="none"
          w={7}
          h={7}
          aria-label="create folder"
          icon={<MdOutlineCreateNewFolder />}
        />
      </Tooltip>
    </>
  );
};

export default AddFolder;
